import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NgxMaskModule } from 'ngx-mask';
import { InputErrorsModule } from 'src/app/shared/components/input-errors/input-errors.module';
import { AuthService } from '../auth.service';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let signUpFormValue = {
    name: "User Test",
    email: "user@test.com",
    password: "User@123",
    confirmPassword: "User@123"
  }
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        CommonModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterModule.forRoot([]),
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        InputErrorsModule,
        NgxMaskModule.forRoot(),
        MatSnackBarModule,
        TranslateModule.forRoot({})
      ],
      providers: [
        AuthService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load login and passwords fields', () => {
    const nativeElement: HTMLElement = fixture.nativeElement;
    const emailField = nativeElement.querySelector('.email');
    const passwordField = nativeElement.querySelector('.password');

    expect(emailField).toBeTruthy();
    expect(passwordField).toBeTruthy();
  })

  it('should disabled login button without email or password', () => {
    const nativeElement: HTMLElement = fixture.nativeElement;
    const loginButton: HTMLButtonElement | null = nativeElement.querySelector('.btn-logar');

    expect(loginButton?.disabled).toBe(true);
  })

  it('should enable login button when inserted email and password', () => {
    component.loginForm.patchValue({
      email: "user@test.com",
      password: "User@123"
    });

    fixture.detectChanges();

    const nativeElement = fixture.nativeElement;
    const loginButton = nativeElement.querySelector('.btn-logar');
    const loginButtonIsDisabled = loginButton?.classList.contains('disabled');

    expect(loginButtonIsDisabled).toBe(false)
  })

  it('should validate email field to be required', () => {
    component.loginForm.patchValue({
      email: "",
      password: "User@10"
    });

    fixture.detectChanges();

    const nativeElement: HTMLElement = fixture.nativeElement;
    const emailInput = nativeElement.querySelector('.email');

    const isEmailFieldInvalid = emailInput?.classList.contains('ng-invalid');

    expect(isEmailFieldInvalid).toBe(true);
  })
  
  it('should validate email field to be type email', () => {
    component.loginForm.patchValue({
      email: "user.field.com",
      password: "User@10"
    });

    fixture.detectChanges();

    const nativeElement: HTMLElement = fixture.nativeElement;
    const emailInput = nativeElement.querySelector('.email');

    const isEmailFieldInvalid = emailInput?.classList.contains('ng-invalid');

    expect(isEmailFieldInvalid).toBe(true);
  })

  it('should validate passoword field to be required', () => {
    component.loginForm.patchValue({
      email: "user.field.com",
      password: ""
    });

    fixture.detectChanges();

    const nativeElement: HTMLElement = fixture.nativeElement;
    const passwordInput = nativeElement.querySelector('.password');

    const isPasswordFieldInvalid = passwordInput?.classList.contains('ng-invalid');

    expect(isPasswordFieldInvalid).toBe(true);
  })

  it('should login user', fakeAsync(() => {
    component.loginForm.patchValue({
      email: "user@test.com",
      password: "User@123"
    });

    fixture.detectChanges();

    const nativeElement: HTMLElement = fixture.nativeElement;
    const loginBtn: HTMLButtonElement | null = nativeElement.querySelector(".btn-logar");

    //spys
    const loginSpy = spyOn(authService, "login")
      .and
      .resolveTo({ access_token: '123' });

    const redirectToDashboardSpy = spyOn(component, "redirectToDashboard");

    loginBtn?.click();

    fixture.detectChanges();
    tick();

    expect(loginSpy)
      .toHaveBeenCalledWith({
        email: "user@test.com",
        password: "User@123"
      })

    expect(redirectToDashboardSpy)
      .toHaveBeenCalled();
  }));

  it('should let user signup and show signup form', () => {
    let nativeElement: HTMLElement = fixture.nativeElement;
    const signUpBtn: HTMLButtonElement | null = nativeElement.querySelector('.btn-signup');

    signUpBtn?.click();
    fixture.detectChanges();

    nativeElement = fixture.nativeElement;
    const nameInput = nativeElement.querySelector('.input-field.name');
    const emailInput = nativeElement.querySelector('.input-field.sign-up-email');
    const passwordInput = nativeElement.querySelector('.input-field.sign-up-password');
    const confirmPasswordInput = nativeElement.querySelector('.input-field.confirm-password');
    const initialValueInput = nativeElement.querySelector('.input-field.initial-value');
    const currencyInput = nativeElement.querySelector('.input-field.currency');

    expect(nameInput).toBeTruthy();
    expect(emailInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
    expect(confirmPasswordInput).toBeTruthy();
    expect(initialValueInput).toBeTruthy();
    expect(currencyInput).toBeTruthy();
  })

  it('should validate email field to be type email', () => {
    let nativeElement: HTMLElement = fixture.nativeElement;
    const signUpBtn: HTMLButtonElement | null = nativeElement.querySelector('.btn-signup');

    signUpBtn?.click();
    component.signUpForm.patchValue({ email: "usertest.com"});
    fixture.detectChanges();
    nativeElement = fixture.nativeElement;

    const emailInput = nativeElement.querySelector('.input-field.sign-up-email');
    const isEmailInputInvalid = emailInput?.classList.contains('ng-invalid');

    expect(isEmailInputInvalid).toBe(true);
  })

  it('should validate emailfield to be required', () => {
    let nativeElement: HTMLElement = fixture.nativeElement;
    const signUpBtn: HTMLButtonElement | null = nativeElement.querySelector('.btn-signup');

    signUpBtn?.click();
    component.signUpForm.patchValue({ email: ""});
    fixture.detectChanges();
    nativeElement = fixture.nativeElement;

    const emailInput = nativeElement.querySelector('.input-field.sign-up-email');
    const isEmailInputInvalid = emailInput?.classList.contains('ng-invalid');

    expect(isEmailInputInvalid).toBe(true);   
  })

  it('should validate password field to be required', () => {
    let nativeElement: HTMLElement = fixture.nativeElement;
    const signUpBtn: HTMLButtonElement | null = nativeElement.querySelector('.btn-signup');

    signUpBtn?.click();
    component.signUpForm.patchValue({ password: ""});
    fixture.detectChanges();
    nativeElement = fixture.nativeElement;

    const passwordInput = nativeElement.querySelector('.input-field.sign-up-email');
    const isPasswordInputInvalid = passwordInput?.classList.contains('ng-invalid');

    expect(isPasswordInputInvalid).toBe(true);   
  })
  
  it('should validate password field to be min length 6', () => {
    let nativeElement: HTMLElement = fixture.nativeElement;
    const signUpBtn: HTMLButtonElement | null = nativeElement.querySelector('.btn-signup');

    signUpBtn?.click();
    component.signUpForm.patchValue({ password: "U@123"});
    fixture.detectChanges();
    nativeElement = fixture.nativeElement;

    const passwordInput = nativeElement.querySelector('.input-field.sign-up-email');
    const isPasswordInputInvalid = passwordInput?.classList.contains('ng-invalid');

    expect(isPasswordInputInvalid).toBe(true);
  })

  it('should validate password field to be max length 20', () => {
    let nativeElement: HTMLElement = fixture.nativeElement;
    const signUpBtn: HTMLButtonElement | null = nativeElement.querySelector('.btn-signup');

    signUpBtn?.click();
    component.signUpForm.patchValue({ password: "UserLongStringTest@123"});
    fixture.detectChanges(); 
    nativeElement = fixture.nativeElement;

    const passwordInput = nativeElement.querySelector('.input-field.sign-up-email');
    const isPasswordInputInvalid = passwordInput?.classList.contains('ng-invalid');

    expect(isPasswordInputInvalid).toBe(true);
  })

  it ('should confirm password on sign up page', () => {
    fixture.detectChanges();
    let nativeElement: HTMLElement = fixture.nativeElement;
    const signUpBtn: HTMLButtonElement | null = nativeElement.querySelector('.btn-signup');

    signUpBtn?.click();
    component.signUpForm.patchValue({ password: "User@123", confirmPassword: ""});
    component.checkPassword(component.signUpForm);
    fixture.detectChanges(); 

    const confirmPasswordInput = fixture.nativeElement.querySelector(".input-field.confirm-password");
    const isConfirmPasswordInvalid = confirmPasswordInput?.classList.contains('ng-invalid');

    expect(isConfirmPasswordInvalid).toBe(true);
  })

  it('should disable send sign up button when form is invalid', () => {
    fixture.detectChanges();
    let nativeElement: HTMLElement = fixture.nativeElement;
    const signUpBtn: HTMLButtonElement | null = nativeElement.querySelector('.btn-signup');

    signUpBtn?.click();
    component.signUpForm.patchValue({ });
    fixture.detectChanges();

    const signFormInvalid = component.signUpForm.invalid;
    const btnSendSignUp = fixture.nativeElement.querySelector('.btn-send-sign-up');

    expect(signFormInvalid).toBe(true);
    expect(btnSendSignUp.disabled).toBe(true)
  })

  it('should signup user', fakeAsync(() => {
    fixture.detectChanges();
    let nativeElement: HTMLElement = fixture.nativeElement;
    const signUpBtn: HTMLButtonElement | null = nativeElement.querySelector('.btn-signup');

    signUpBtn?.click();
    component.signUpForm.patchValue({ ...signUpFormValue });
    fixture.detectChanges();
    const btnSendSignUp = fixture.nativeElement.querySelector('.btn-send-sign-up');
    const btnSendSignUpEnabled = !btnSendSignUp?.classList.contains('disabled');
    
    expect(btnSendSignUpEnabled).toBe(true);

    //spy
    const signUpSpy = spyOn(authService, "signUp")
      .and
      .resolveTo({status: 200});
    const showCreatedMessageSpy = spyOn(component, "showUserCreatedMessage")

    btnSendSignUp?.click();
    tick();

    expect(signUpSpy).toHaveBeenCalled();
    expect(showCreatedMessageSpy).toHaveBeenCalled(); 
  }))
});
