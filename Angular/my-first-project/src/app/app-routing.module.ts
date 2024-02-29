import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FirtsComponentComponent } from './firts-component/firts-component.component';
import { SecondComponentComponent } from './second-component/second-component.component';
import { AuthGuardService } from './auth-guard.service';

const routes: Routes = [
  {
    path: 'first-component',
    component: FirtsComponentComponent,
  },
  {
    path: 'second-component',
    component: SecondComponentComponent,
    canActivate:[AuthGuardService]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
