import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../service';
import { ConfirmPasswordValidator,checkPasswordValidation } from 'src/app/ helper/validation';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm!: FormGroup;
  filter!: string;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    // find token from url
    this.filter = this.route.snapshot.queryParamMap.get('token') ?? '';

    // reset password form
    this.resetPasswordForm = this.fb.group({
      newPassword: new FormControl('', [Validators.required , checkPasswordValidation]),
      confirmPassword: new FormControl('', [
        Validators.required, 
      ]),
    },{
      validators:
      ConfirmPasswordValidator('newPassword','confirmPassword')
    });
  }

  onSubmit() {
    if (this.resetPasswordForm.valid) {
      const { newPassword } = this.resetPasswordForm.value;

      this.authService
        .resetPassword({ password: newPassword, token: this.filter })
        .subscribe(() => {
          this.router.navigate(['/login']);
        });
    }
  }
}
