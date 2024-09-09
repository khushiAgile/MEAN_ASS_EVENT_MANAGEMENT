import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/service';
import { ConfirmModalComponent } from 'src/app/common/modal/confirm-modal/confirm-modal.component';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isLoggedIn!: boolean;
  isAdmin!: boolean;
  cartItems = [];

  constructor(
    private dialog: MatDialog,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.isAdmin = this.authService.isAdmin();
  }

  logout() {
    const dialog = this.dialog.open(ConfirmModalComponent, {
      data: {
        modalTitle: 'Logout',
        modalMessage: 'Are you sure you want to logout?',
      },
    });
    dialog.afterClosed().subscribe((result) => {
      if (result) {
        this.authService.logout();
        this.router.navigate(['/']);
      }
    });
  }
}
