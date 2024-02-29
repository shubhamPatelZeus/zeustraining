import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPersonalInformationComponent } from './register-personal-information/register-personal-information.component';
import { RegisterComponent } from './register/register.component';
import { Router } from '@angular/router';
import { RegisterQualificationsComponent } from './register-qualifications/register-qualifications.component';
import { RegisterReviewAndProceedComponent } from './register-review-and-proceed/register-review-and-proceed.component';
import { WalkInListComponent } from './walk-in-list/walk-in-list.component';
import { WalkInDetailsComponent } from './walk-in-details/walk-in-details.component';
import { JobRoleDescriptionComponent } from './job-role-description/job-role-description.component';
import { ApplicationSuccessComponent } from './application-success/application-success.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpErrorInterceptor } from './http-error.interceptor';

@NgModule({
  declarations: [AppComponent, HeaderComponent, LoginPageComponent, RegisterPersonalInformationComponent, RegisterComponent, RegisterQualificationsComponent, RegisterReviewAndProceedComponent, WalkInListComponent, WalkInDetailsComponent, JobRoleDescriptionComponent, ApplicationSuccessComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  providers: [
    {

      provide: HTTP_INTERCEPTORS,

      useClass: HttpErrorInterceptor,

      multi: true

    }],
  bootstrap: [AppComponent],
})
export class AppModule {}
