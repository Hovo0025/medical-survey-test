import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/root/app.component';
import { LocalStorageService } from './core/services/local-storage.service';
import { AuthorizationService } from './auth/authorization.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,

  ],
  providers: [
    LocalStorageService,
    AuthorizationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
