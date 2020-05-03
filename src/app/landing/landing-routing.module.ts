import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LandingComponent } from './components/root/landing.component';
import { DiscoverComponent } from './components/discover/discover.component';
import { AuthorizationComponent } from './components/authorization/authorization.component';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
    children: [
      {
        path: '',
        component: DiscoverComponent
      },
      {
        path: 'authorization',
        component: AuthorizationComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingRoutingModule {
}
