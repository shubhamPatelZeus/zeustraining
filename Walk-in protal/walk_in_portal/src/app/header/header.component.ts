import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { UserDataService } from '../services/UserDataService/user-data.service';
import { IUserData } from '../interfaces';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  userData?: IUserData;
  constructor(private userDataService: UserDataService) {}

  ngOnInit(): void {
    this.userDataService.getUserData().subscribe((data) => {
      this.userData = data;
    });
  }
}
