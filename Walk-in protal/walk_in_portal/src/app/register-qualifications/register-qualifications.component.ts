import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from '../services/RegisterService/register.service';
import { Router } from '@angular/router';
import { ApiRequestsService } from '../services/APIService/api-requests.service';
import {
  IApplicantType,
  ICollege,
  IQualification,
  IStream,
  ITechnology,
} from '../interfaces';

@Component({
  selector: 'app-register-qualifications',
  templateUrl: './register-qualifications.component.html',
  styleUrl: './register-qualifications.component.css',
})
export class RegisterQualificationsComponent implements OnInit {
  isEducationalQaulificationsFormOpen: boolean = true;
  isProfessionalQualificationsFormOpen: boolean = true;
  technologies: ITechnology[] = [];

  months: number[] = [1, 2, 3];

  qualifications: IQualification[] = [];
  streams: IStream[] = [];
  colleges: ICollege[] = [];
  applicantTypes: IApplicantType[] = [];
  qualificationsForm = new FormGroup({
    educationalQualification: new FormGroup({
      aggregate_percentage: new FormControl(''),
      year_of_passing: new FormControl(''),
      qualification_type: new FormControl({}),
      college_name: new FormControl({}),
      college_location: new FormControl(''),
      stream_type: new FormControl({}),
    }),
    professionalQualification: new FormGroup({
      applicant_type: new FormControl(),
      years_of_experience: new FormControl(0),
      current_ctc: new FormControl(0),
      expected_ctc: new FormControl(0),
      user_familiar_technology: new FormArray([
        new FormGroup({
          id: new FormControl(),
          name: new FormControl(''),
        }),
      ]),
      user_expert_technology: new FormArray([
        new FormGroup({
          id: new FormControl(),
          name: new FormControl(''),
        }),
      ]),
      is_there_notice_period: new FormControl(''),
      notice_period_end_date: new FormControl(new Date()),
      notice_period_length_in_months: new FormControl(0),
      is_appeared_previously: new FormControl(''),
      role_applied_for: new FormControl(''),
    }),
  });

  constructor(
    private registerSevice: RegisterService,
    private router: Router,
    private apiRequests: ApiRequestsService
  ) {}

  ngOnInit(): void {
    if (this.registerSevice.getQualificationsFormData())
      this.qualificationsForm.setValue(
        this.registerSevice.getQualificationsFormData()
      );
    this.registerSevice.setFormPageNumber(2);
    this.apiRequests.fetchQualificationListRequest().subscribe((data) => {
      this.qualifications = data;
    });
    this.apiRequests.fetchCollegListRequest().subscribe((data) => {
      this.colleges = data;
    });
    this.apiRequests.fetchStreamListRequest().subscribe((data) => {
      this.streams = data;
    });
    this.apiRequests.fetchTechnologyListRequest().subscribe((data) => {
      this.technologies = data;
    });
    this.apiRequests.fetchApplicantTypeListRequest().subscribe((data) => {
      this.applicantTypes = data;
    });
  }

  getCurrentYear() {
    const date = new Date();
    return date.getFullYear();
  }
  getYears(uptoYear: number) {
    const years = [];
    const currentYear = this.getCurrentYear();
    for (let index = currentYear - uptoYear; index >= 0; index--) {
      years.push(uptoYear + index);
    }

    return { years, currentYear };
  }

  toggleEducationalQaulificationsForm() {
    this.isEducationalQaulificationsFormOpen =
      !this.isEducationalQaulificationsFormOpen;
  }
  toggleProfessionalQualificationsForm() {
    this.isProfessionalQualificationsFormOpen =
      !this.isProfessionalQualificationsFormOpen;
  }

  onUserExpertTechnologyChange(technology: string, id: number, event: Event) {
    const isChecked = (<HTMLInputElement>event.target).checked;
    const user_expert_technology =
      this.qualificationsForm.controls.professionalQualification.controls
        .user_expert_technology;
    if (isChecked) {
      user_expert_technology.push(
        new FormGroup({
          name: new FormControl(technology),
          id: new FormControl(id),
        })
      );
    } else {
      let index = user_expert_technology.controls.findIndex(
        (x) => x.value.id == id
      );
      user_expert_technology.removeAt(index);
    }
    console.log(user_expert_technology.value);
  }

  onUserFamiliarTechnologyChange(technology: string, id: number, event: Event) {
    const isChecked = (<HTMLInputElement>event.target).checked;
    const user_familiar_technology =
      this.qualificationsForm.controls.professionalQualification.controls
        .user_familiar_technology;
    if (isChecked) {
      user_familiar_technology.push(
        new FormGroup({
          name: new FormControl(technology),
          id: new FormControl(id),
        })
      );
    } else {
      let index = user_familiar_technology.controls.findIndex(
        (x) => x.value.id == id
      );
      user_familiar_technology.removeAt(index);
    }
    console.log(user_familiar_technology.value);
  }

  onSubmit() {
    const user_expert_technology =
      this.qualificationsForm.controls.professionalQualification.controls
        .user_expert_technology;
    let index1 = user_expert_technology.controls.findIndex(
      (x) => x.value.name == ''
    );
    if (index1 >= 0) user_expert_technology.removeAt(index1);
    const user_familiar_technology =
      this.qualificationsForm.controls.professionalQualification.controls
        .user_familiar_technology;
    let index2 = user_familiar_technology.controls.findIndex(
      (x) => x.value.name == ''
    );
    if (index2 >= 0) user_familiar_technology.removeAt(index2);
    console.log(this.qualificationsForm);
    this.registerSevice.setQualificationsFormData(
      this.qualificationsForm.value
    );
    this.router.navigate(['/register/review-and-proceed']);
  }
}
