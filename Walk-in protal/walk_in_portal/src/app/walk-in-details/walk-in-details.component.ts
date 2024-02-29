import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ApiRequestsService } from '../services/APIService/api-requests.service';
import { UserDataService } from '../services/UserDataService/user-data.service';
import { IUserData, IWalkInDetails } from '../interfaces';

@Component({
  selector: 'app-walk-in-details',
  templateUrl: './walk-in-details.component.html',
  styleUrl: './walk-in-details.component.css',
})
export class WalkInDetailsComponent implements OnInit {
  // walkIn = {
  //   id: 1,
  //   title: 'Walk In for Multiple Job Roles',
  //   dateAndTime: '03-Jul-2021 to 04-Jul-2021',
  //   timeSlots: ['9:00 AM to 11:00 AM', '1:00 PM to 3:00 PM'],
  //   location: 'Mumbai',
  //   jobRoles: [
  //     {
  //       name: 'Instructional Designer',
  //       grossCompensationPackage: 'Rs. 5,00,000 lpa',
  //       roleDescription: [
  //         '- Generate highly interactive and innovative instructional strategies for e-learning solutions',
  //       ],
  //       requirements: [
  //         '- Experience in creating instructional plans and course maps.',
  //       ],
  //     },
  //     {
  //       name: 'Software Quality Engineer',
  //       grossCompensationPackage: 'Rs. 5,00,000 lpa',
  //       roleDescription: [
  //         '- Generate highly interactive and innovative instructional strategies for e-learning solutions',
  //       ],
  //       requirements: [
  //         '- Experience in creating instructional plans and course maps.',
  //       ],
  //     },
  //   ],
  //   expiresIn: 'Expires in 5 days',
  //   is_internship_opportunity_for_mca_students: false,
  //   preRequisitesAndApplicationProcess: {
  //     generalInstructions: [
  //       '- We have a two–year indemnity for permanent candidates. We will provide training to the selected candidates.',
  //     ],
  //     instructionsForTheExam: [
  //       '- Candidates cannot use an iOS system/device for this exam.',
  //     ],
  //     minimumSystemRequirements: [
  //       '- Personal Laptop or Desktop computer in working condition with good quality camera (you can use Windows 7 and above).',
  //     ],
  //     process: [
  //       '- Every round is an elimination round. Candidates need to clear all rounds to get selected.',
  //       'Round I : 4th August, 2018 ',
  //       'Aptitude Test : 25 Questions',
  //       'Round II (Interview) : 4th August, 2018.',
  //     ],
  //   },
  // };

  walkIn?: IWalkInDetails;
  applicationResponse?: any;
  userData?: IUserData;
  waklInApplicationForm = new FormGroup({
    timeSlot: new FormControl(Number),
    preferedRoles: new FormArray([new FormControl()]),
    resume: new FormControl(),
  });

  isPreRequisitesAndApplicationProcessOpen: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiRequests: ApiRequestsService,
    private userDataService: UserDataService
  ) {}

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const walkInIdFromRoute = Number(routeParams.get('walkInId'));
    console.log(walkInIdFromRoute);
    this.apiRequests.fetchWalkInDetailsRequest(walkInIdFromRoute).subscribe(
      (data) => {
        this.walkIn = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onPreferedRoleChange(role: Number, event: Event) {
    const isChecked = (<HTMLInputElement>event.target).checked;
    const preferedRoles = this.waklInApplicationForm.controls.preferedRoles;
    if (isChecked) {
      preferedRoles.push(new FormControl(role));
    } else {
      let index = preferedRoles.controls.findIndex((x) => x.value == role);
      preferedRoles.removeAt(index);
    }
    console.log(preferedRoles.value);
  }

  togglePreRequisitesAndApplicationProcessForm() {
    this.isPreRequisitesAndApplicationProcessOpen =
      !this.isPreRequisitesAndApplicationProcessOpen;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  handleFileInput(event: Event) {
    const files = (<HTMLInputElement>event.target).files;
    const formData = new FormData();
    if (files?.length) formData.append('file', files[0], files[0].name);
    this.apiRequests.uploadFileRequest(formData).subscribe((data) => {
      this.waklInApplicationForm.controls.resume = new FormControl(
        data.file_url
      );
    });
  }

  onSubmit() {
    const preferedRoles = this.waklInApplicationForm.controls.preferedRoles;
    let index1 = preferedRoles.controls.findIndex((x) => x.value == null);
    if (index1 >= 0) preferedRoles.removeAt(index1);
    this.userDataService.getUserData().subscribe((data) => {
      this.userData = data;
    });
    const routeParams = this.route.snapshot.paramMap;
    const walkInIdFromRoute = Number(routeParams.get('walkInId'));
    console.log({
      userId: this.userData?.id,
      jobOpeningId: walkInIdFromRoute,
      jobOpeningTimeSlotId: this.waklInApplicationForm.controls.timeSlot.value,
      jobRoleId: this.waklInApplicationForm.controls.preferedRoles.value,
      resumeUrl: this.waklInApplicationForm.controls.resume.value,
    });
    this.apiRequests
      .applyForWalkIn({
        userId: this.userData?.id,
        jobOpeningId: walkInIdFromRoute,
        jobOpeningTimeSlotId:
          this.waklInApplicationForm.controls.timeSlot.value,
        jobRoleId: this.waklInApplicationForm.controls.preferedRoles.value,
        resumeUrl: this.waklInApplicationForm.controls.resume.value,
      })
      .subscribe(
        (data) => {
          this.router.navigate(['/success-page/' + data.id]);
        },
        (error) => {
          console.log(error);
          alert(error);
        }
      );
  }
}
