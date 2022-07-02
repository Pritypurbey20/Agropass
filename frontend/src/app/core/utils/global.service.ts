import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserTypes } from '../../shared/module/shared';
import { ToastrService } from 'ngx-toastr';
import { constVariable } from 'src/environments/const';
import { message } from 'src/environments/en';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  private isLoggedOut = false;
  private userIdChar = btoa(constVariable.USERID);
  private usernameChar = btoa(constVariable.USERNAME);
  private usertypeChar = btoa(constVariable.USERTYPE);
  private othertypeChar = btoa(constVariable.OTHERTYPE);
  private tokenChar = btoa(constVariable.TOKEN);

  constructor(private router: Router, private toastr: ToastrService) { }

  setUserInfo = (userId: any, usertype: any, username: any, authtoken: any) => {

    this.isLoggedOut = false;
    sessionStorage.setItem(usertype + this.userIdChar, btoa(userId));
    sessionStorage.setItem(usertype + this.usernameChar, btoa(username));
    if (usertype == constVariable.USER) {
      sessionStorage.setItem(this.usertypeChar, btoa(usertype));
    } else {
      sessionStorage.setItem(this.othertypeChar, btoa(usertype));
    }
    sessionStorage.setItem(this.tokenChar, btoa(authtoken));
  }

  getUserType = () => {
    var userType;
    if (window.location.pathname.split("/")[1] == constVariable.USER) {
      userType = atob(sessionStorage.getItem(this.usertypeChar) || '');
    } else {
      userType = atob(sessionStorage.getItem(this.othertypeChar) || '');
    }
    return userType as UserTypes;
  }

  signOutUser = () => {
    sessionStorage.clear()
    this.router.navigateByUrl('admin/login');
  }

  clearSessionStorage = () => {
    sessionStorage.removeItem(this.getUserType() + this.userIdChar);
    sessionStorage.removeItem(this.getUserType() + this.usernameChar);
    sessionStorage.removeItem(this.getUserType() + this.tokenChar);
    if (window.location.pathname.split("/")[1] == constVariable.CLIENT) {
      sessionStorage.removeItem(this.usertypeChar);
    } else {
      sessionStorage.removeItem(this.othertypeChar);
    }
  }

  unauthorizeUser = () => {
    if (!this.isLoggedOut) {
      this.isLoggedOut = true;
    }
    this.toastr.error(message.notAuthorized);
  }

  isUserLoggedIn = () => {
    const token = sessionStorage.getItem(this.tokenChar);
    if (token !== undefined && token != null) {
      return true;
    } else {
      return false;
    }
  }
  getAuthToken = () => {
    return atob(sessionStorage.getItem(this.tokenChar) || '');
  }
}
