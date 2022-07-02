import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../../../core/utils/global.service';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from 'src/app/core/http/api/users.service';
import { constVariable } from 'src/environments/const';
declare var $: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  myName : any;

  constructor(private globalService : GlobalService , private userService: UsersService ,  private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getMyDetails()
  }

  onSignOut() {
    this.globalService.signOutUser();
    $('#signOut').modal('hide');
  }

  getMyDetails() {
    try {
      this.userService.getMe().subscribe((res: any) => {
        if (res.status === constVariable.SUCCESS) {
          let myDetails = res.data.data;
          this.myName = myDetails.firstName;
          
        } else {
          this.toastr.error(res.error.errors.message);
        }
      })
    } catch (error: any) {
      this.toastr.error(error.message);
    }
  }
}