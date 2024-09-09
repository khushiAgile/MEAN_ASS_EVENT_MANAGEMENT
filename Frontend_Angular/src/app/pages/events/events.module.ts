import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventAddComponent } from './component/event-add/event-add.component';
import { EventDetailComponent } from './component/event-detail/event-detail.component';
import { EventListComponent } from './component/event-list/event-list.component';
import { EventsRoutingModule } from './events-routing.module';
import { MaterialModule } from 'src/app/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UserEventListComponent } from './component/user-event-list/user-event-list.component';
import { EventEditComponent } from './component/event-edit/event-edit.component';

@NgModule({
  declarations: [EventAddComponent, EventDetailComponent, EventListComponent,UserEventListComponent,EventEditComponent],
  imports: [
    EventsRoutingModule,
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
})
export class EventsModule {}
