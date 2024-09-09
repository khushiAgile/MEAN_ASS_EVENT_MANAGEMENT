import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services';
import { IUserListRes } from '../../../../common/interface/users.interface';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmModalComponent } from 'src/app/common/modal/confirm-modal/confirm-modal.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  userList: IUserListRes = {
    result: [],
    recordsFiltered: 0,
    recordsTotal: 0,
  };
  searchText = '';
  // display columns for table
  displayedColumns: string[] = ['name', 'email', 'status', 'actions'];

  pageLimit = 10;
  pageOffset = 0;

  constructor(
    private usersService: UsersService,
    private dialog: MatDialog,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.apiCall();
  }

  apiCall() {
    this.usersService
      .userList({
        offset: this.pageOffset,
        limit: this.pageLimit,
        search: this.searchText,
      })
      .subscribe((res) => {
        this.userList = res.data;
      });
  }

  onSearch() {
    this.pageOffset = 0;
    this.apiCall();
  }

  resetSearch() {
    this.searchText = '';
    this.pageOffset = 0;
    this.apiCall();
  }

  deleteUser(userId: string) {
    const dialog = this.dialog.open(ConfirmModalComponent, {
      data: {
        modalTitle: 'Delete User',
        modalMessage: 'Are you sure you want to delete this user?',
      },
    });
    dialog.afterClosed().subscribe((result) => {
      if (result) {
        this.usersService.userDelete(userId).subscribe((res) => {
          if (res.statusCode === 200) {
            this.toastr.success(res.message);
            this.apiCall();
          }
        });
      }
    });
  }

  // handle pagination
  onPageChange(event: PageEvent): void {
    this.pageLimit = event.pageSize;
    this.pageOffset = event.pageIndex * this.pageLimit;

    this.apiCall();
  }

  // Handle user status
  userStatus(userId: string, status: boolean) {
    const dialog = this.dialog.open(ConfirmModalComponent, {
      data: {
        modalTitle: 'Change User Status',
        modalMessage: `Are you sure you want to ${
          status ? 'inactive' : 'active'
        } this user?`,
      },
    });
    dialog.afterClosed().subscribe((result) => {
      if (result) {
        this.usersService.userStatus(userId).subscribe((res) => {
          if (res.statusCode === 200) {
            this.toastr.success(res.message);
            this.apiCall();
          }
        });
      }
    });
  }
}
