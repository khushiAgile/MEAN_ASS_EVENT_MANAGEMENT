import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventsService } from '../../services';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IEvent } from '../../../../common/interface/events.interface';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.css'],
  providers: [DatePipe],
})
export class EventEditComponent implements OnInit {
  eventForm: FormGroup = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    date: ['', Validators.required],
    time: ['', Validators.required],
    location: ['', Validators.required],
  });
  eventDetail!: IEvent | null;

  constructor(
    private fb: FormBuilder,
    private eventsService: EventsService,
    private route: Router,
    private routes: ActivatedRoute,
    private toastr: ToastrService,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    // Find event id from url
    const eventId = this.routes.snapshot.paramMap.get('eventId') || '';

    this.eventsService.eventDetail(eventId).subscribe((res) => {
      this.eventForm.patchValue({
        title: res.data.title || '', // Default value if not present
        description: res.data.description || '',
        date: res.data.date || '', // Default example date
        time: res.data.time || '00:00', // Default example time
        location: res.data.location || '',
      });
    });
  }

  onSubmit() {
    if (this.eventForm.valid) {
      const { title, description, date, time, location } = this.eventForm.value;
     
      // Format to 'yyyy-mm-dd'
      const formattedDate = this.datePipe.transform(date, 'yyyy-MM-dd') ?? '';

      this.eventsService
        .eventUpdate(this.routes.snapshot.paramMap.get('eventId') ?? '', {
          title,
          description,
          date:formattedDate,
          time,
          location,
        })
        .subscribe((res) => {
          if (res.statusCode === 200) {
            this.toastr.success(res.message);
            this.route.navigate(['/events']);
            this.eventForm.reset();
          }
        });
    }
  }
}
