import { Component, OnInit } from '@angular/core';
import { message } from '../../../../environments/en';
import { ToastrService } from 'ngx-toastr';
import { constVariable } from '../../../../environments/const';
import { RolesService } from '../../../core/http/api/roles.service';
import { HttpParams } from '@angular/common/http';

declare var $: any;
@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {

  roleData: Array<any> = [];
  roleDataById: any = {};
  activePage: string = 'roles';
  mode = '';
  page = 1;
  rowIndex = 1;
  pageSize = 3;
  limit: any;
  totalRecords : any
  searchText: any = "";
  Num: any = ['5' , '10' , '50']

  constructor(private toastr: ToastrService, private rolesService: RolesService) {}
  ngOnInit(): void {
    this.getRoles()
  }

  getRoles() {
    try {
      let params = new HttpParams();
      params = params.append('page', this.page);
      params = params.append('limit', this.limit || this.Num[0]);
      params = params.append('search', this.searchText);
      params = params.append('modelName' , 'roles');
      this.rolesService.getRoles(params).subscribe((res: any) => {
        if (res.status == constVariable.SUCCESS) {
          this.totalRecords = res.data.records;
          const allRolesArray = res.data.data;
          this.roleData = allRolesArray.filter(function (role: any) {
            return role["active"] == true;
          });
        }
      })
    } catch (error: any) {
      this.toastr.error(error.message);
      return;
    }
  }


  deleteRole() {
    try {
      $('#deleteRole').modal('hide');
      this.rolesService.deleteRole(this.roleDataById._id).subscribe((res: any) => {
        if (res.status == constVariable.SUCCESS) {
          $('#deleteRole').modal('hide');
          this.toastr.success(message.role.roleDeleted);
          this.getRoles();
        } else {
          $('#deleteRole').modal('hide');
          this.toastr.error(res.error.errors.message);
        }
      })
    } catch (error: any) {
      $('#deleteRole').modal('hide');
      this.toastr.error(error.message);
      return;
    }
  }

  getRoleById(role: any) {
    this.roleDataById = role
  }

  moveToAddRole(){
    this.activePage = "add-role"
    this.mode = constVariable.ADD
  }

  redirectToRolePage() {
    this.activePage = "roles";
    this.getRoles()
  }

  pageChange(e: any) {
    this.page = e;
    if (this.page > 1) {
      this.rowIndex = 1 + ((this.page - 1) * this.pageSize)
    } else {
      this.rowIndex = 1
    }
    this.getRoles();
  }

  changeNum(e: any) {
    this.limit = e.target.value;
    this.getRoles();
  }

  search(e: any) {
    this.searchText = e.target.value
    this.getRoles();
  }
}
