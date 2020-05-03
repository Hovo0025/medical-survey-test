import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './components/root/landing.component';
import { DiscoverComponent } from './components/discover/discover.component';
import { AuthorizationComponent } from './components/authorization/authorization.component';
import { MoveNextByMaxLengthDirective } from '../core/directives/move-next-by-max-length.directive';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    LandingComponent,
    DiscoverComponent,
    AuthorizationComponent,
    MoveNextByMaxLengthDirective
  ],
  imports: [
    CommonModule,
    SharedModule,
    LandingRoutingModule,
    ReactiveFormsModule
  ],
})
export class LandingModule {
}
