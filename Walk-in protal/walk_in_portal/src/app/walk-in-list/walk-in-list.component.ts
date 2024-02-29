import { Component, OnInit } from '@angular/core';
import { ApiRequestsService } from '../services/APIService/api-requests.service';
import { IWalkIns } from '../interfaces';

@Component({
  selector: 'app-walk-in-list',
  templateUrl: './walk-in-list.component.html',
  styleUrl: './walk-in-list.component.css',
})
export class WalkInListComponent implements OnInit {
  walkInList: IWalkIns[] = [
    // {
    //   id: 1,
    //   title: 'Walk In for Multiple Job Roles',
    //   dateAndTime: '03-Jul-2021 to 04-Jul-2021',
    //   location: 'Mumbai',
    //   jobRoles: ['Instructional Designer', 'Software Quality Engineer'],
    //   expiresIn: 'Expires in 5 days',
    //   is_internship_opportunity_for_mca_students: false,
    // },
    // {
    //   id: 2,
    //   title: 'Walk In for Multiple Job Roles',
    //   dateAndTime: '03-Jul-2021 to 04-Jul-2021',
    //   location: 'Mumbai',
    //   jobRoles: ['Instructional Designer', 'Software Quality Engineer'],
    //   expiresIn: 'Expires in 5 days',
    //   is_internship_opportunity_for_mca_students: false,
    // },
    // {
    //   id: 3,
    //   title: 'Walk In for Multiple Job Roles',
    //   dateAndTime: '03-Jul-2021 to 04-Jul-2021',
    //   location: 'Mumbai',
    //   jobRoles: ['Instructional Designer', 'Software Quality Engineer'],
    //   expiresIn: 'Expires in 5 days',
    //   is_internship_opportunity_for_mca_students: true,
    // },
    // {
    //   id: 4,
    //   title: 'Walk In for Multiple Job Roles',
    //   dateAndTime: '03-Jul-2021 to 04-Jul-2021',
    //   location: 'Mumbai',
    //   jobRoles: ['Instructional Designer', 'Software Quality Engineer'],
    //   expiresIn: 'Expires in 5 days',
    //   is_internship_opportunity_for_mca_students: false,
    // },
  ];

  constructor(private apiRequests: ApiRequestsService) {}

  ngOnInit(): void {
    this.apiRequests.fetchWalkInListRequest().subscribe({
      next: (data) => {
        this.walkInList = data;
        console.log(data);
      },
      error: (e) => {
        console.error(e.error);
      },
    });
  }
}
