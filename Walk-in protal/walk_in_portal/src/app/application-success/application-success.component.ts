import { Component, OnInit } from '@angular/core';
import { ApiRequestsService } from '../services/APIService/api-requests.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { IJobApplicationDetails } from '../interfaces';

@Component({
  selector: 'app-application-success',
  templateUrl: './application-success.component.html',
  styleUrl: './application-success.component.css',
})
export class ApplicationSuccessComponent implements OnInit {
  jobApplicationDetails?: IJobApplicationDetails;

  constructor(
    private apiRequests: ApiRequestsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const applicationIdFromRoute = Number(routeParams.get('applicationId'));
    this.apiRequests
      .fetchWalkInApplicationSuccessDetailsRequest(applicationIdFromRoute)
      .subscribe((data) => {
        this.jobApplicationDetails = data;
        console.log(this.jobApplicationDetails);
      });
  }
}
