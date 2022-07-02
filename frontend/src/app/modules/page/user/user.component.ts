import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../core/http/api/users.service';
import { message } from 'src/environments/en';
import { ToastrService } from 'ngx-toastr';
import { constVariable } from 'src/environments/const';
import { RolesService } from '../../../core/http/api/roles.service';
import { HttpParams } from '@angular/common/http';
declare var $: any;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  userData: Array<any> = [];
  userDataByID: any = {};
  role: any;
  roleId: any;
  roleData: Array<any> = [];
  totalRecords: any;
  page = 1;
  rowIndex = 1;
  pageSize = 3;
  limit: any;
  activePage: string = 'users';
  mode = '';
  searchText: any = "";
  Num: any = ['5', '10', '50']

  constructor(private usersService: UsersService, private toastr: ToastrService, private rolesService: RolesService) {}

  ngOnInit(): void {
    this.getAllUsers()
    this.getRoles()
  }

  getAllUsers() {
    try {
      let params = new HttpParams();
      params = params.append('page', this.page);
      params = params.append('limit', this.limit || this.Num[0]);
      params = params.append('search', this.searchText);
      params = params.append('modelName' , 'users');

      this.usersService.getUser(params).subscribe((res: any) => {
        if (res.status == constVariable.SUCCESS) {
          const allUsers = res.data.data;
          this.totalRecords = res.data.records;
          this.userData = allUsers.filter(function (user: any) {
            return user["active"] == true;
          })
        } else {
          this.toastr.error(res.error.errors.message)
        }
      })
    } catch (error: any) {
      this.toastr.error(error.message);
      return;
    }
  }

  deleteUser() {
    try {
      this.usersService.deleteUser(this.userDataByID._id).subscribe((res: any) => {
        if (res.status == constVariable.SUCCESS) {
          $('#deleteUser').modal('hide');
          this.toastr.success(message.user.userDeleted)
          this.getAllUsers();
        } else {
          $('#deleteUser').modal('hide');
          this.toastr.error(res.error.errors.message)
        }
      })
    } catch (error: any) {
      this.toastr.error(error.message);
      return;
    }
  }

  getUserById(user: any) {
    this.userDataByID = user;
    this.activePage = "edit-user"
    this.mode = constVariable.EDIT

  }

  getUserDetailsId(user: any) {
    this.userDataByID = user;
  }


  getRoles() {
    try {
      this.rolesService.getRoles().subscribe((res: any) => {
        if (res.status == constVariable.SUCCESS) {
          const allRoleData = res.data.data;
          this.roleData = allRoleData.filter(function (role: any) {
            return role['active'] == true;
          })
          this.roleId = this.roleData[0]._id;
        } else {
          this.toastr.error(res.error.errors.message);
        }
      })
    } catch (error: any) {
      this.toastr.error(error.message);
      return;
    }
  }

  textchange(event: any) {
    console.log(event.target.value);
    this.role = event.target.value
  }

  search(e: any) {
    this.searchText = e.target.value
    this.getAllUsers();
  }

  pageChange(e: any) {
    this.page = e;
    if (this.page > 1) {
      this.rowIndex = 1 + ((this.page - 1) * this.pageSize)
    } else {
      this.rowIndex = 1
    }
    this.getAllUsers();
  }

  changeNum(e: any) {
    this.limit = e.target.value;
    this.getAllUsers();
  }

  redirectToUserePage() {
    this.activePage = "users";
    this.getAllUsers()
  }

  moveToAddUser() {
    this.activePage = "add-user";
    this.mode = constVariable.ADD
  }
}
