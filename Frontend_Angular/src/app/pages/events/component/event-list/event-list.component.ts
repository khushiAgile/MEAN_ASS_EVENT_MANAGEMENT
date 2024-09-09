import { Component, OnInit } from '@angular/core';
import { IEventListRes } from '../../../../common/interface/events.interface';
import { EventsService } from '../../services';
import { PageEvent } from '@angular/material/paginator';
import { AuthService } from 'src/app/auth/service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmModalComponent } from 'src/app/common/modal/confirm-modal/confirm-modal.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css'],
  providers: [DatePipe],
})
export class EventListComponent implements OnInit {
  eventList: IEventListRes = {
    result: [],
    recordsFiltered: 0,
    recordsTotal: 0,
  };
  isLoggedIn!: boolean;
  isAdmin!: boolean;

  // display columns for table
  displayedColumns: string[] = [
    'title',
    'description',
    'location',
    'date',
    'actions',
  ];

  searchText = '';
  searchLocation = '';
  searchDate: Date | null = null;
  pageLimit = 10;
  pageOffset = 0;

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private eventsService: EventsService,
    private authService: AuthService,
    private dialog: MatDialog,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    // Check if user is logged in and role is admin or not
    this.isLoggedIn = this.authService.isLoggedIn();
    this.isAdmin = this.authService.isAdmin();

    // Event list api call
    this.apiCall();
  }

  apiCall() {
    const formattedDate = this.datePipe.transform(this.searchDate, 'yyyy-MM-dd');
    this.eventsService
      .eventList({
        limit: this.pageLimit,
        offset: this.pageOffset,
        search: this.searchText,
        location: this.searchLocation,
        date: formattedDate,
      })
      .subscribe((res) => {
        this.eventList = res.data;
      });
  }

  applyFilters() {
    this.apiCall();
  }
  resetFilters() {
    this.searchText = '';
    this.searchLocation = '';
    this.searchDate = null;

    this.apiCall();
  }

  editEvent(eventId: string) {
    this.router.navigate(['/events/edit', eventId]);
  }

  deleteEvent(eventId: string) {
    const dialog = this.dialog.open(ConfirmModalComponent, {
      data: {
        modalTitle: 'Delete Event',
        modalMessage: 'Are you sure you want to delete this event?',
      },
    });
    dialog.afterClosed().subscribe((result) => {
      if (result) {
        this.eventsService.eventDelete(eventId).subscribe((res) => {
          if (res.statusCode == 200) {
            this.toastr.success(res.message);
            this.apiCall();
          }
        });
      }
    });
  }

  onPageChange(event: PageEvent): void {
    this.pageLimit = event.pageSize;
    this.pageOffset = event.pageIndex * this.pageLimit;

    this.apiCall();
  }
}
