import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPersonalInformationComponent } from './register-personal-information/register-personal-information.component';
import { RegisterComponent } from './register/register.component';
import { RegisterQualificationsComponent } from './register-qualifications/register-qualifications.component';
import { RegisterReviewAndProceedComponent } from './register-review-and-proceed/register-review-and-proceed.component';
import { WalkInListComponent } from './walk-in-list/walk-in-list.component';
import { WalkInDetailsComponent } from './walk-in-details/walk-in-details.component';
import { ApplicationSuccessComponent } from './application-success/application-success.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent,
    title: 'Walk-In Portal - Log-In',
  },
  {
    path: 'register',
    component: RegisterComponent,
    children: [
      {
        path: 'personal-info',
        component: RegisterPersonalInformationComponent,
      },
      {
        path: 'qualifications',
        component: RegisterQualificationsComponent,
      },
      {
        path: 'review-and-proceed',
        component: RegisterReviewAndProceedComponent,
      },
    ],
  },
  {
    path: 'walk-in-list',
    component: WalkInListComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: 'walk-in/:walkInId',
    component: WalkInDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'success-page/:applicationId',
    component: ApplicationSuccessComponent,
    canActivate: [AuthGuard],
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
