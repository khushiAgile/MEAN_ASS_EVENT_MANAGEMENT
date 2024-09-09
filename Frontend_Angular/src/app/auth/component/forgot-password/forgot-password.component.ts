import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService,
  ) {}

  ngOnInit() {
    this.forgotPasswordForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  onSubmit() {
    if (this.forgotPasswordForm.valid) {
      const { email } = this.forgotPasswordForm.value;
      this.authService.forgot({ email }).subscribe((res) => {
        if (res.statusCode === 201) {
          this.toastr.success(res.message);
          this.router.navigate(['/login']);
        }
      });
    }
  }
}
