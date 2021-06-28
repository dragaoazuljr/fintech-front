import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'fintech-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  showSignUp = false;

  loginForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required])
  })

  signUpForm = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20)
    ]),
    confirmPassword: new FormControl(null, [Validators.required]),
    initialValue: new FormControl(null),
    currency: new FormControl(null)
  })

  currencyOptions = [
    "BRL",
    "USD",
    "EUR"
  ]

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _snackBarService: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.signUpForm.valueChanges.subscribe(() => this.checkPassword(this.signUpForm));
  }

  checkPassword(group: FormGroup) {
    const password = group.get('password');
    const confirmPassword = group.get('confirmPassword');

    password?.value !== confirmPassword?.value ?
      confirmPassword?.setErrors({ notSamePassword: true }) :
      confirmPassword?.setErrors(null)
  }

  async login(){
    const loginUserData = this.loginForm.value;

    const login = await this._authService.login(loginUserData) 

    if (!login) return;

    this.redirectToDashboard();
  }

  redirectToDashboard() {
    this._router.navigate(['/dashboard']);
  }

  showSignUpForm(){
    this.showSignUp = !this.showSignUp;
  }

  async signUp() {
    const signUpData = this.signUpForm.getRawValue();

    const signUp = await this._authService.signUp(signUpData);

    if(signUp) this.showUserCreatedMessage()
  }

  showUserCreatedMessage() {
    this._snackBarService.open("Usuário criado com sucesso!", "x", {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 5000,
      panelClass: 'snack-bar-success'
    })

    this.cancelSignUp();
  }

  cancelSignUp() {
    this.showSignUpForm();
    this.signUpForm.reset();
  }

}
