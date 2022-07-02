import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { regex } from 'src/environments/regex';
import { message } from 'src/environments/en';
import { UserTypes } from '../../../../shared/module/shared';
import { GlobalService } from '../../../../core/utils/global.service';
import { UsersService } from '../../../../core/http/api/users.service';
import { ToastrService } from 'ngx-toastr';
import { constVariable } from 'src/environments/const';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  isSubmitted: boolean = false
  emailPattern = regex.emailPattern;
  emailRequired = message.login.emailRequired
  invalidEmail = message.login.invalidEmail
  passwordRequired = message.login.passwordRequired
  token: any;

  constructor(private fb: FormBuilder, private globalService: GlobalService, private usersService: UsersService, private router: Router, private toastr: ToastrService) {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.pattern(this.emailPattern)]],
      password: ["", [Validators.required]]
    })
  }

  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  ngOnInit(): void {
    this.checkUserLogin()
  }

  loginSubmit() {
    try {
      this.isSubmitted = true
      if (!this.loginForm.valid) {
        return;
      }
      const body = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      };
      this.usersService.validateUser(body).subscribe((res: any) => {
        if (res.status == constVariable.SUCCESS) {
          this.toastr.success(message.login.loginSuccess);
          this.token = res.data.token
          console.log('this.token', this.token)
          this.globalService.setUserInfo('1', 'user', 'username', this.token)
          this.router.navigateByUrl('user/dashboard');
        } else {
          this.loginForm.reset()
          this.toastr.error(res.error.errors.message)
        }
      }
      )
    } catch (error: any) {
      this.loginForm.reset()
      this.toastr.error(error.message)
      return;
    }
  }

  getApiUrlPath() {
    const type = this.router.url.split('/')[1];

    switch (type.toLowerCase()) {
      case 'user':
        return 'user';
      case 'admin':
        return 'admin';
      case 'superAdmin':
        return 'superAdmin';
    }
  }

  getLoginApiUrl = () => {
    const userType = this.getApiUrlPath();

    if (userType === 'admin') {
      return 'admin/login';
    }
    if (userType === 'superAdmin') {
      return 'superAdmin/login';
    }
    if (userType === 'user') {
      return 'user/login';
    }
  }

  register() {
    this.router.navigateByUrl("/signUp");
  }


  getDefaultPageUrl = () => {
    const userType = this.globalService.getUserType();

    if (userType === UserTypes.admin) {
      return 'admin/home';
    }
    if (userType === UserTypes.superAdmin) {
      return 'superAdmin/home';
    }
    if (userType === UserTypes.user) {
      return 'user/dashboard';
    }

  }

  checkUserLogin = () => {
    const isLoggedIn = this.globalService.isUserLoggedIn();
    if (isLoggedIn) {
      this.router.navigateByUrl(this.getDefaultPageUrl()!);
    } else {
      this.globalService.clearSessionStorage();
    }
  }
}
