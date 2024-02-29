import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import {
  IApplicantType,
  ICollege,
  IQualification,
  IRole,
  IStream,
  ITechnology,
  IWalkIns,
  IWalkInDetails,
  IUserData,
  IJobApplicationDetails,
} from '../../interfaces';
@Injectable({
  providedIn: 'root',
})
export class ApiRequestsService {
  private baseUrl = environment.BASE_URL;
  private getHttpHeaderWithToken() {
    let userData = JSON.parse(localStorage.getItem('userData') || '');
    return { Authorization: 'Bearer ' + userData.token };
  }

  constructor(private http: HttpClient) {}
  registerRequest(data: Object) {
    return this.http.post(this.baseUrl + '/Registration', data);
  }
  loginRequest(data: Object): Observable<IUserData> {
    return this.http.post<IUserData>(this.baseUrl + '/Auth/login', data);
  }
  loginByTokenRequest() {
    return this.http.post(this.baseUrl + '/Auth/login-by-token', null, {
      headers: this.getHttpHeaderWithToken(),
    });
  }
  fetchWalkInListRequest(): Observable<IWalkIns[]> {
    return this.http.get<IWalkIns[]>(this.baseUrl + '/walkIn/list', {
      headers: this.getHttpHeaderWithToken(),
    });
  }

  fetchWalkInDetailsRequest(id: number): Observable<IWalkInDetails> {
    return this.http.get<IWalkInDetails>(this.baseUrl + '/walkIn/' + id, {
      headers: this.getHttpHeaderWithToken(),
    });
  }

  fetchWalkInApplicationSuccessDetailsRequest(
    id: number
  ): Observable<IJobApplicationDetails> {
    return this.http.get<IJobApplicationDetails>(
      this.baseUrl + '/walkIn/success/' + id,
      {
        headers: this.getHttpHeaderWithToken(),
      }
    );
  }
  fetchJobRoleListRequest(): Observable<IRole[]> {
    return this.http.get<IRole[]>(this.baseUrl + '/Registration/job-roles');
  }
  fetchQualificationListRequest(): Observable<IQualification[]> {
    return this.http.get<IQualification[]>(
      this.baseUrl + '/Registration/qualifications'
    );
  }
  fetchCollegListRequest(): Observable<ICollege[]> {
    return this.http.get<ICollege[]>(this.baseUrl + '/Registration/colleges');
  }
  fetchStreamListRequest(): Observable<IStream[]> {
    return this.http.get<IStream[]>(this.baseUrl + '/Registration/streams');
  }
  fetchApplicantTypeListRequest(): Observable<IApplicantType[]> {
    return this.http.get<IApplicantType[]>(
      this.baseUrl + '/Registration/applicant-types'
    );
  }
  fetchTechnologyListRequest(): Observable<ITechnology[]> {
    return this.http.get<ITechnology[]>(
      this.baseUrl + '/Registration/technologies'
    );
  }

  applyForWalkIn(data: Object): Observable<{ id: number }> {
    return this.http.post<{ id: number }>(
      this.baseUrl + '/walkIn/apply',
      data,
      {
        headers: this.getHttpHeaderWithToken(),
      }
    );
  }

  uploadFileRequest(data: any) {
    return this.http.post<{ file_url: string }>(
      this.baseUrl + '/UploadFile',
      data
    );
  }
}
