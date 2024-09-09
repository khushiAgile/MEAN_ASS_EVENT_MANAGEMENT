import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/service';
import { IAttendeesRes, IEvent } from '../../../../common/interface/events.interface';
import { EventsService } from '../../services';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmModalComponent } from 'src/app/common/modal/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css'],
})
export class EventDetailComponent implements OnInit {
  attendees: IAttendeesRes = {
    result: [],
    recordsFiltered: 0,
    recordsTotal: 0,
  };
  isAdmin!: boolean;
  eventDetail!: IEvent | null;

  // display columns for table
  displayedColumns: string[] = ['name', 'email'];
  searchText = '';
  pageLimit = 10;
  pageOffset = 0;

  constructor(
    private eventsService: EventsService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private dialog: MatDialog,
  ) {}
  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();

    // Event list api call if user is admin
    if (this.isAdmin) {
      this.attendeesListApiCall();
    }

    // Find event id from url
    const eventId = this.route.snapshot.paramMap.get('eventId') || '';

    // Event detail api call
    this.eventDetailApiCall(eventId);
  }

  eventDetailApiCall(eventId: string) {
    this.eventsService.eventDetail(eventId).subscribe((res) => {
      this.eventDetail = res.data;
    });
  }

  attendeesListApiCall() {
    this.eventsService
      .eventAttendeesList({
        eventId: this.route.snapshot.paramMap.get('eventId') || '',
        limit: this.pageLimit,
        offset: this.pageOffset,
        search: this.searchText,
      })
      .subscribe((res) => {
        this.attendees = res.data;
      });
  }

  onPageChange(event: PageEvent): void {
    this.pageLimit = event.pageSize;
    this.pageOffset = event.pageIndex * this.pageLimit;

    this.attendeesListApiCall();
  }

  userRsvp(eventId: string) {
      const dialog = this.dialog.open(ConfirmModalComponent, {
      data: {
        modalTitle: 'Attend Event',
        modalMessage: 'Are you sure you want to attend this event?',
      },
    });
    dialog.afterClosed().subscribe((result) => {
      if (result) {
        this.eventsService.userRsvp(eventId).subscribe((res) => {
          if (res.statusCode == 201) {
            this.toastr.success(res.message);
            this.eventDetailApiCall(eventId);
          }
        });
    
      }
    });
  }
}
