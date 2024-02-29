import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { IUserData } from '../../interfaces';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  userData: BehaviorSubject<IUserData> = new BehaviorSubject<IUserData>(
    JSON.parse(localStorage.getItem('userData') || '{}') || {}
  );
  constructor() {
    this.userData = new BehaviorSubject<IUserData>(
      JSON.parse(localStorage.getItem('userData') || '{}') || {}
    );
  }

  getUserData(): Observable<IUserData> {
    return this.userData.asObservable();
  }

  setUserData(data: IUserData) {
    localStorage.setItem('userData', JSON.stringify(data));
    this.userData.next(data);
  }
}
