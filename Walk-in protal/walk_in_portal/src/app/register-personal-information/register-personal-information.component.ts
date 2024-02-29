import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from '../services/RegisterService/register.service';
import { Router } from '@angular/router';
import { ApiRequestsService } from '../services/APIService/api-requests.service';
import { IRole } from '../interfaces';

@Component({
  selector: 'app-register-personal-information',
  templateUrl: './register-personal-information.component.html',
  styleUrl: './register-personal-information.component.css',
})
export class RegisterPersonalInformationComponent implements OnInit {
  isInstructionalDesignerChecked: boolean = false;
  isSoftwareEngineerChecked: boolean = false;
  isSoftwareQualityEngineerChecked: boolean = false;
  isMailListSubcribed: boolean = false;
  jobRoles: IRole[] = [];

  personalInfoForm = new FormGroup({
    email_id: new FormControl(''),
    password: new FormControl(''),
    first_name: new FormControl(''),
    last_name: new FormControl(''),
    phone_number: new FormControl(''),
    country_code: new FormControl(''),
    portfolio_url: new FormControl(''),
    preferred_job_roles: new FormArray([
      new FormGroup({
        id: new FormControl(),
        name: new FormControl(''),
      }),
    ]),
    user_image: new FormControl(''),
    resume: new FormControl(''),
    referrer_name: new FormControl(''),
    is_subscribed_to_email: new FormControl('false'),
  });

  constructor(
    private registerSevice: RegisterService,
    private router: Router,
    private apiRequest: ApiRequestsService
  ) {}

  ngOnInit(): void {
    this.registerSevice.setFormPageNumber(1);
    if (this.registerSevice.getPersonalInfoFormData())
      this.personalInfoForm.setValue(
        this.registerSevice.getPersonalInfoFormData()
      );
    this.apiRequest.fetchJobRoleListRequest().subscribe((data) => {
      this.jobRoles = data;
    });
  }

  onSubmit() {
    const preferred_job_roles_array =
      this.personalInfoForm.controls.preferred_job_roles;
    let index = preferred_job_roles_array.controls.findIndex(
      (x) => x.value.id == null
    );
    if (index >= 0) preferred_job_roles_array.removeAt(index);
    console.log(this.personalInfoForm);
    this.router.navigate(['/register/qualifications']);
    this.registerSevice.setPersonalInfoFormData(this.personalInfoForm.value);
  }

  onPreferredJobChange(jobRoleId: Number, jobRole: string, event: Event) {
    const isChecked = (<HTMLInputElement>event.target).checked;
    const preferred_job_roles =
      this.personalInfoForm.controls.preferred_job_roles;
    if (isChecked) {
      preferred_job_roles.push(
        new FormGroup({
          id: new FormControl(jobRoleId),
          name: new FormControl(jobRole),
        })
      );
    } else {
      let index = preferred_job_roles.controls.findIndex(
        (x) => x.value.id == jobRoleId
      );
      preferred_job_roles.removeAt(index);
    }
    console.log(preferred_job_roles.value);
  }

  handleFileInput(event: Event) {
    const files = (<HTMLInputElement>event.target).files;
    const formData = new FormData();
    if (files?.length) formData.append('file', files[0], files[0].name);
    this.apiRequest.uploadFileRequest(formData).subscribe((data) => {
      this.personalInfoForm.controls.resume = new FormControl(data.file_url);
    });
  }

  handleImageInput(event: Event) {
    const files = (<HTMLInputElement>event.target).files;
    const formData = new FormData();
    if (files?.length) formData.append('file', files[0], files[0].name);
    this.apiRequest.uploadFileRequest(formData).subscribe((data) => {
      this.personalInfoForm.controls.user_image = new FormControl(
        data.file_url
      );
    });
  }
  toggleMailListSubcription() {
    this.isMailListSubcribed = !this.isMailListSubcribed;
    if (this.isMailListSubcribed)
      this.personalInfoForm.controls.is_subscribed_to_email = new FormControl(
        'true'
      );
    else
      this.personalInfoForm.controls.is_subscribed_to_email = new FormControl(
        'false'
      );
  }
}
