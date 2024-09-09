import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../services';
import { IUser } from '../../../../common/interface/users.interface';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent implements OnInit {
  userDetail!: IUser | null;

  constructor(
    private userService: UsersService,
    private route: ActivatedRoute,
  ) {}
  ngOnInit(): void {
    // Find user id from url
    const userId = this.route.snapshot.paramMap.get('userId') ?? '';

    // Event detail api call
    this.userService.userDetail(userId).subscribe((res) => {
      this.userDetail = res.data;
    });
  }
}
