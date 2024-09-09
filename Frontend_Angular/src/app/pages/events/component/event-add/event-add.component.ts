import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventsService } from '../../services';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-event-add',
  templateUrl: './event-add.component.html',
  styleUrls: ['./event-add.component.css'],
  providers: [DatePipe],
})
export class EventAddComponent implements OnInit {
  eventForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private eventsService: EventsService,
    private route: Router,
    private toastr: ToastrService,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      location: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.eventForm.valid) {
      const { title, description, date, time, location } = this.eventForm.value;
      // Format to 'yyyy-MM-dd'
      const formattedDate = this.datePipe.transform(date, 'yyyy-MM-dd') ?? '';

      this.eventsService
        .eventCreate({
          title,
          description,
          date: formattedDate,
          time,
          location,
        })
        .subscribe((res) => {
          if (res.statusCode === 201) {
            this.toastr.success(res.message);
            this.route.navigate(['/events']);
            this.eventForm.reset();
          }
        });
    }
  }
}
