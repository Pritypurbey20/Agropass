import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { regex } from 'src/environments/regex';
import { message } from 'src/environments/en';
import { UsersService } from '../../../../core/http/api/users.service';
import { ToastrService } from 'ngx-toastr';
import {constVariable} from 'src/environments/const';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  registerForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    passwordConfirm: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
  });

  isSubmitted: boolean = false
  emailPattern = regex.emailPattern;
  emailRequired = message.login.emailRequired
  invalidEmail = message.login.invalidEmail
  passwordRequired = message.login.passwordRequired
  passwordValidate = message.login.passwordValidate
  nameRequired = message.signup.nameRequired
  confirmPasswordRequired = message.signup.confirmPasswordRequired
  passwordNotSame = message.signup.passwordNotSame
  firstNameRequired = message.signup.firstNameRequired
  lastNameRequired = message.signup.lastNameRequired

  constructor(private router: Router, private fb: FormBuilder, private usersService: UsersService , private toastr: ToastrService) {
    this.registerForm = this.fb.group({
      name: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.pattern(this.emailPattern)]],
      password: ["", [Validators.required, Validators.minLength(8)]],
      passwordConfirm: ["", [Validators.required, Validators.minLength(8)]],
      firstName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
    })
  }

  get f(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }

  ngOnInit(): void {
  }

  registerSubmit() {
    try {
      this.isSubmitted = true
      if (!this.registerForm.valid) {
        return;
      }
      const body = {
        name: this.registerForm.value.name,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
        passwordConfirm: this.registerForm.value.passwordConfirm,
        firstName: this.registerForm.value.firstName,
        lastName: this.registerForm.value.lastName,
      };

      this.usersService.registerUser(body).subscribe((res: any) => {
        if (res.status == constVariable.SUCCESS) {
          this.toastr.success(message.signup.signUpSuccess);
          this.router.navigateByUrl("admin/login")
        } else {
          this.registerForm.reset()
          this.toastr.error(res.error.errors.message);
        }
      })

    } catch (error: any) {
      this.registerForm.reset()
      this.toastr.error(error.message)
      return;
    }
  }

}
