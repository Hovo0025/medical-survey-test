import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { LocalStorageConstants } from '../core/constants/local-storage.constants';
import { LocalStorageService } from '../core/services/local-storage.service';
import { UserDataConstants } from '../core/constants/user-data.constants';
import { ApiErrorModel } from '../core/models/api-error.model';
import { VerifyModel } from '../core/models/verify.model';
import { LoginModel } from '../core/models/login.model';

@Injectable()
export class AuthorizationService {
  private apiUrl = environment.apiUrl;
  public isLoggedIn$ = new BehaviorSubject<boolean>(this.isAuthenticated());

  constructor(private http: HttpClient) {
  }

  public logIn(accessToken, email): void {
    LocalStorageService.saveItem(LocalStorageConstants.accessToken, accessToken);
    LocalStorageService.saveItem(LocalStorageConstants.email, email);
    this.isLoggedIn$.next(true);
  }

  public logOut(): void {
    LocalStorageService.clearAll();
    this.isLoggedIn$.next(false);
  }

  public isAuthenticated(): boolean {
    const token = LocalStorageService.getData(LocalStorageConstants.accessToken);
    return !!token;
  }

  public loginUser(email: string): Observable<LoginModel | ApiErrorModel> {
    const url = `${this.apiUrl}users/login`;
    const loginUserData = {
      email,
      full_name: UserDataConstants.fullName,
      country: UserDataConstants.country,
      zip_code: UserDataConstants.zipCode
    };

    return this.http.post<LoginModel | ApiErrorModel>(url, loginUserData);
  }

  public verifyCode(data: { email: string, verification_code: string }): Observable<VerifyModel | ApiErrorModel> {
    const url = `${this.apiUrl}users/verifycode`;

    return this.http.post<VerifyModel | ApiErrorModel>(url, data);
  }
}
