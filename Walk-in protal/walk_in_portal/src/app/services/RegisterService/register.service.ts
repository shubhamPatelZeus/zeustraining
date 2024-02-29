import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  formData: any = {};
  formPageNumber: BehaviorSubject<Number> = new BehaviorSubject<Number>(1);

  constructor() {}

  setPersonalInfoFormData(personalInfoForm: object) {
    this.formData = { ...this.formData, personalInfoForm };
    console.log('From register sevice', this.formData);
  }
  setQualificationsFormData(qualificationForm: object) {
    this.formData = { ...this.formData, qualificationForm };
    console.log('From register sevice', this.formData);
  }
  setFormPageNumber(pageNum: number) {
    this.formPageNumber.next(pageNum);
  }

  //To get the values
  getFormData() {
    return this.formData;
  }

  getFormPageNumber(): Observable<Object> {
    return this.formPageNumber.asObservable();
  }

  getPersonalInfoFormData() {
    return this.formData.personalInfoForm;
  }

  getQualificationsFormData() {
    return this.formData.qualificationForm;
  }
}
