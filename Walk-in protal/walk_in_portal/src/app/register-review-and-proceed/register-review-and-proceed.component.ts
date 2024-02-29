import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RegisterService } from '../services/RegisterService/register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-review-and-proceed',
  templateUrl: './register-review-and-proceed.component.html',
  styleUrl: './register-review-and-proceed.component.css',
})
export class RegisterReviewAndProceedComponent implements OnInit {
  userInfo : any = {};
  constructor(private registerSevice: RegisterService, private router: Router,private cdr: ChangeDetectorRef) {
    this.userInfo = this.registerSevice.getFormData();
    console.log(this.userInfo);
    this.registerSevice.setFormPageNumber(3);
  }

  ngOnInit(): void {
    this.cdr.detectChanges();
  }
  onSubmit() {}
}
