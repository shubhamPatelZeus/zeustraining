import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../services/RegisterService/register.service';
import { ApiRequestsService } from '../services/APIService/api-requests.service';
import { Route, Router } from '@angular/router';
import { IUserData } from '../interfaces';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  disabled: boolean = true;
  formPageNumber: any = 0;
  userInfo: any;
  constructor(
    private router: Router,
    private registerSevice: RegisterService,
    private apiRequest: ApiRequestsService
  ) {}

  ngOnInit(): void {
    this.registerSevice.getFormPageNumber().subscribe((data) => {
      this.formPageNumber = data;
    });
  }
  toggeleDisable() {
    this.disabled = !this.disabled;
  }

  submitRegistrationForm() {
    console.log('reg');
    this.userInfo = this.registerSevice.getFormData();

    this.apiRequest.registerRequest(this.userInfo).subscribe(
      (data) => {
        this.router.navigate(['/login']);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
