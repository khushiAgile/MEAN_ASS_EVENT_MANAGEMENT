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
import { checkPasswordValidation } from 'src/app/ helper/validation';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  roles = [
    { value: 'ADMIN', viewValue: 'Admin' },
    { value: 'USER', viewValue: 'User' },
  ];
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService,
  ) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      name: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required , checkPasswordValidation]),
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const { email, password, name } = this.registerForm.value;
      this.authService.register({ email, password, name }).subscribe((res) => {
        if (res.statusCode === 201) {
          this.toastr.success(res.message);
          this.router.navigate(['/login']);
        }
      });
    }
  }
}
