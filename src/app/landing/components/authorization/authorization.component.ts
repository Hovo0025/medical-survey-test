import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthorizationService } from '../../../auth/authorization.service';
import { UserDataConstants } from '../../../core/constants/user-data.constants';
import { ValidatorHelpers } from '../../../core/helpers/validator.helpers';
import { ApiErrorModel } from '../../../core/models/api-error.model';
import { VerifyModel } from '../../../core/models/verify.model';
import { LoginModel } from '../../../core/models/login.model';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})
export class AuthorizationComponent implements OnInit {
  public authorizationForm: FormGroup;
  public validateForm: FormGroup;
  public email = UserDataConstants.email;
  public firstStepActive = true;
  public secondStepActive = false;
  public code = { firstNumber : '', secondNumber: '', thirdNumber: '', forthNumber: '' };
  public busy = false;

  constructor(private authorizationService: AuthorizationService,
              private router: Router) {
  }

  ngOnInit() {
    this.authorizationForm = new FormGroup({
      email: new FormControl(this.email,
        [Validators.required, Validators.email])
    });

    this.validateForm = new FormGroup({
      firstNumber: new FormControl('',
        [Validators.required, Validators.pattern(ValidatorHelpers.ONLY_NUMBERS)]),
      secondNumber: new FormControl('',
        [Validators.required, Validators.pattern(ValidatorHelpers.ONLY_NUMBERS)]),
      thirdNumber: new FormControl('',
        [Validators.required, Validators.pattern(ValidatorHelpers.ONLY_NUMBERS)]),
      forthNumber: new FormControl('',
        [Validators.required, Validators.pattern(ValidatorHelpers.ONLY_NUMBERS)]),
    });
  }

  public onLoginUser() {
    this.busy = true;
    this.email = this.authorizationForm.value.email;
    this.authorizationService.loginUser(this.email)
      .subscribe(
        (res: LoginModel | ApiErrorModel) => {
          this.busy = false;
          if (res.response) {
            this.firstStepActive = false;
            this.secondStepActive = true;
            const codeStr = (res as LoginModel).code;
            this.code.firstNumber = codeStr[0];
            this.code.secondNumber = codeStr[1];
            this.code.thirdNumber = codeStr[2];
            this.code.forthNumber = codeStr[3];
          }
        });
  }

  public onVerifyCode() {
    this.busy = true;
    const value = this.validateForm.value;
    const code = `${value.firstNumber}${value.secondNumber}${value.thirdNumber}${value.forthNumber}`;
    const data = {
      email: this.email,
      verification_code: code
    };

    this.authorizationService.verifyCode(data)
      .subscribe((res: VerifyModel | ApiErrorModel) => {
        if (res.response) {
          const token = (res as VerifyModel).token;
          this.authorizationService.logIn(token, data.email);
          this.secondStepActive = false;
        }
      });
  }

  public onNewValue(ev, key) {
    const pattern = /^\d+$/;
    const isNumber = pattern.test(ev.key);

    if (isNumber) {
      this.code[key] = ev.key;
    }
  }

  public resetForm(main: boolean = false) {
    this.validateForm.reset();
    this.firstStepActive = true;
    this.secondStepActive = false;
    if (main) {
      this.authorizationForm.reset();
      this.router.navigate(['../']);
    }
  }

  public resendPassword() {
    this.onLoginUser();
  }
}
