import { Component, Input } from '@angular/core';
import { IRoleWithDescription } from '../interfaces';

@Component({
  selector: 'app-job-role-description',
  templateUrl: './job-role-description.component.html',
  styleUrl: './job-role-description.component.css',
})
export class JobRoleDescriptionComponent {
  isJobRoleDescriptionOpen: boolean = false;
  @Input() jobRoleDescription?: IRoleWithDescription;

  toggleJobRoleDescription() {
    this.isJobRoleDescriptionOpen = !this.isJobRoleDescriptionOpen;
  }
}
