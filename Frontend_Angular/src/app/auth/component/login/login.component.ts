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
import { TOKEN_STORAGE_KEY, USER_INFO_STORAGE_KEY } from 'src/app/common/constant';
import { ILoginRes } from '../../../common/interface/auth.interface';
import { checkPasswordValidation } from 'src/app/ helper/validation';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService,
  ) {}

  ngOnInit() {
    const token = localStorage.getItem(TOKEN_STORAGE_KEY);
    if (token) {
      this.router.navigate(['/events']);
    }

    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required,checkPasswordValidation]),
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService
        .login({ email, password })
        .subscribe((res: ILoginRes) => {
          localStorage.setItem(TOKEN_STORAGE_KEY, res.data.accessToken);
          localStorage.setItem(USER_INFO_STORAGE_KEY, JSON.stringify(res.data));
          this.toastr.success(res.message);
          this.router.navigate(['/events']);
        });
    }
  }
}
