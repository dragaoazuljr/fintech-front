import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'fintech-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  showSignUp = false;

  loginForm = new FormGroup({
    email: new FormControl(null, [Validators.required]),
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


  constructor() { }

  ngOnInit(): void {
  }

  login(){
    //TODO: send login
  }

  showSignUpForm(){
    this.showSignUp = !this.showSignUp;
  }

  signUp() {
    //TODO: send sign up
  }

  cancelSignUp() {
    this.showSignUpForm();
    this.signUpForm.reset();
  }

}
