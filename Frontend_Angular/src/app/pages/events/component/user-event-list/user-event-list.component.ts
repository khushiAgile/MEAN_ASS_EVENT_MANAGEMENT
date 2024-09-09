import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { EventsService } from '../../services';
import { IEventListRes } from '../../../../common/interface/events.interface';

@Component({
  selector: 'app-user-event-list',
  templateUrl: './user-event-list.component.html',
  styleUrls: ['./user-event-list.component.css'],
})
export class UserEventListComponent implements OnInit {
  eventList: IEventListRes = {
    result: [],
    recordsFiltered: 0,
    recordsTotal: 0,
  };
  isLoggedIn!: boolean;
  isAdmin!: boolean;

  // display columns for table
  displayedColumns: string[] = ['title', 'description', 'date'];

  pageLimit = 10;
  pageOffset = 0;

  constructor(private eventsService: EventsService) {}

  ngOnInit(): void {
    this.apiCall();
  }

  apiCall() {
    this.eventsService
      .eventListAttendedByUser({
        offset: this.pageOffset,
        limit: this.pageLimit,
      })
      .subscribe((res) => {
        this.eventList = res.data;
      });
  }

  onSearch() {
    this.pageOffset = 0;
    this.apiCall();
  }

  resetSearch() {
    this.pageOffset = 0;
    this.apiCall();
  }

  // handle pagination
  onPageChange(event: PageEvent): void {
    this.pageLimit = event.pageSize;
    this.pageOffset = event.pageIndex * this.pageLimit;

    this.apiCall();
  }
}
