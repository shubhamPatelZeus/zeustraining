import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiRequestsService } from '../services/APIService/api-requests.service';
import { UserDataService } from '../services/UserDataService/user-data.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent implements OnInit {
  rememberMe: boolean = false;
  passwordInputType : string= 'password';
  errorMsg: string = '';
  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  constructor(
    private router: Router,
    private apiRequests: ApiRequestsService,
    private userDataService: UserDataService
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('userData')?.length) {
      this.apiRequests.loginByTokenRequest().subscribe(
        (data) => {
          this.router.navigate(['/walk-in-list']);
        },
        (error) => {
          localStorage.removeItem('userData');
        }
      );
    }
  }

  onSubmit() {
    console.log(this.loginForm.value);
    this.apiRequests
      .loginRequest({
        email: this.loginForm.controls.email.value,
        password: this.loginForm.controls.password.value,
        rememberMe: this.rememberMe,
      })
      .subscribe({
        next: (data) => {
          const userData = { ...data };
          this.userDataService.setUserData(data);
          // console.log(...data)
          this.errorMsg = '';
          this.router.navigate(['/walk-in-list']);
        },
        error: (e) => {
          this.errorMsg = e.error;
        },
      });
  }

  toggleRememberMe() {
    this.rememberMe = !this.rememberMe;
  }

  toggleShowPassword() {
    this.passwordInputType == 'text'
      ? (this.passwordInputType = 'password')
      : (this.passwordInputType = 'text');
  }
}
