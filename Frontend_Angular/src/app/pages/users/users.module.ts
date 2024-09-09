import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDetailComponent } from './component/user-detail/user-detail.component';
import { UserListComponent } from './component/user-list/user-list.component';
import { UsersRoutingModule } from './users-routing.module';
import { MaterialModule } from 'src/app/material.module';

@NgModule({
  declarations: [UserDetailComponent, UserListComponent],
  imports: [CommonModule, UsersRoutingModule, MaterialModule],
})
export class UsersModule {}
