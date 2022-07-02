import { Component, OnInit } from '@angular/core';
import { message } from 'src/environments/en';
import { ToastrService } from 'ngx-toastr';
import { constVariable } from 'src/environments/const';
import { PermissionService } from '../../../core/http/api/permission.service';
import { HttpParams } from '@angular/common/http';
declare var $: any;
@Component({
  selector: 'app-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.css']
})
export class PermissionComponent implements OnInit {
  isSubmitted = false;
  permissionData: Array<any> = [];
  permissionDataById: any;
  activePage: string = 'permission';
  mode = '';
  searchText: any = "";
  Num: any = ['5' , '10' , '50']
  totalRecords: any;
  page = 1;
  rowIndex = 1;
  pageSize = 3;
  limit: any;
  roleData: any;
  role: any;
  nameRequired = message.role.nameRequired;
  roleRequired = message.role.roleRequired;
  permissionDetails: any;


  constructor( private toastr: ToastrService, private permissionService: PermissionService ) { }

  ngOnInit(): void {
    this.getPermission()
  }

  deletePermission() {
    try {
      this.permissionService.deletePermission(this.permissionDataById._id).subscribe((res: any) => {
        if (res.status == constVariable.SUCCESS) {
          $('#deletePermsission').modal('hide');
          this.getPermission()
          this.toastr.success(message.permission.permissionDeleted);
        } else {
          $('#deletePermsission').modal('hide');
          this.toastr.error(res.error.errors.message);
        }
      })
    } catch (error: any) {
      this.toastr.error(error.message)
    }
  }

  getPermission() {
    try {
      let params = new HttpParams();
      params = params.append('page', this.page);
      params = params.append('limit', this.limit || this.Num[0]);
      params = params.append('search', this.searchText);
      params = params.append('modelName' , 'permission');
      this.permissionService.getPermission(params).subscribe((res: any) => {
        this.totalRecords = res.data.records;
        const allPermissionData = res.data.data;
        this.permissionData = allPermissionData.filter(function (permission: any) {
          return permission['active'] == true;
        })
      })
    } catch (error: any) {
      this.toastr.error(error.message)
    }
  }

  moveToAddPermission(){
    this.activePage = "add-permission"
    this.mode = constVariable.ADD
  }

  getPermisssionDeatilsById(name: any, permission: any){
    this.permissionDataById = name._id;
  }

  getPermisssionDataById(name: any, permission: any) {
    this.permissionDataById = name;
    this.permissionDetails = permission;
    this.activePage = "edit-permission"
    this.mode = constVariable.EDIT
  }

  redirectToPermissionPage() {
    this.activePage = "permission";
    this.getPermission()
  }

  pageChange(e: any) {
    this.page = e;
    if (this.page > 1) {
      this.rowIndex = 1 + ((this.page - 1) * this.pageSize)
    } else {
      this.rowIndex = 1
    }
    this.getPermission();
  }

  changeNum(e: any) {
    this.limit = e.target.value;
    this.getPermission();
  }

  search(e: any) {
    this.searchText = e.target.value
    this.getPermission();
  }

}
