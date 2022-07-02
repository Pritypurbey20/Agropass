import { Injectable } from '@angular/core';
import {  CanActivate, Router} from '@angular/router';
import { GlobalService } from '../utils/global.service'
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private globalservice: GlobalService, private router: Router){}
    canActivate(): boolean {
      if (!this.globalservice.isUserLoggedIn()) {  
        this.router.navigateByUrl("/login");  
    }  
    return this.globalservice.isUserLoggedIn();  
  }
}
