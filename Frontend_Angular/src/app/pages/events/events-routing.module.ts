import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventListComponent } from './component/event-list/event-list.component';
import { EventAddComponent } from './component/event-add/event-add.component';
import { EventDetailComponent } from './component/event-detail/event-detail.component';
import { AdminGuard } from 'src/app/guard/admin.guard';
import { UserGuard } from 'src/app/guard/user.guard';
import { UserEventListComponent } from './component/user-event-list/user-event-list.component';
import { EventEditComponent } from './component/event-edit/event-edit.component';

const routes: Routes = [
  {
    path: '',
    component: EventListComponent,
  },
  {
    path: 'create',
    component: EventAddComponent,
    canActivate: [AdminGuard],
  },
  {
    path:'myevents',
    component:UserEventListComponent,
    canActivate:[UserGuard]
  },
  {
    path: 'edit/:eventId',
    component: EventEditComponent,
    canActivate: [AdminGuard],
  },
  {
    path: ':eventId',
    component: EventDetailComponent,
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventsRoutingModule {}
