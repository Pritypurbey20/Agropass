import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { constVariable } from 'src/environments/const';
import { message } from 'src/environments/en';
import { HttpParams } from '@angular/common/http';
import {FarmsService} from 'src/app/core/http/api/farms.service';

declare var $: any;
@Component({
  selector: 'app-farms',
  templateUrl: './farms.component.html',
  styleUrls: ['./farms.component.css']
})
export class FarmsComponent implements OnInit {

  farmData: Array<any> = []
  farmDataById: any;
  limit: any;
  activePage: string = 'farms';
  mode = '';
  totalRecords: any;
  page = 1;
  rowIndex = 1;
  pageSize = 3;
  searchText: any = "";
  Num: any = ['5' , '10' , '50']

  constructor(private toastr: ToastrService , private farmService : FarmsService) {}

  ngOnInit(): void {
    this.getFarms()
  }

  getFarms() {
    try {
      let params = new HttpParams();
      params = params.append('page', this.page);
      params = params.append('limit', Number(this.limit) || this.Num[0]);
      params = params.append('search', this.searchText);
      params = params.append('modelName' , 'farms');
      this.farmService.getFarms(params).subscribe((res: any) => {
        if (res.status == constVariable.SUCCESS) {
          this.farmData = res.data.data
          this.totalRecords = res.data.records
        } else {
          this.toastr.error(res.error.errors.message)
        }
      })
    } catch (error: any) {
      this.toastr.error(error.message);
      return;
    }
  }

  deleteFarm() {
    try {
      this.farmService.deleteFarm(this.farmDataById._id).subscribe((res: any) => {
        if (res.status == constVariable.SUCCESS) {
          $('#deleteFarm').modal('hide');
          this.toastr.success(message.farm.farmDeleted)
          this.getFarms()
        } else {
          $('#deleteFarm').modal('hide');
          this.toastr.error(res.error.errors.message)
        }
      })

    } catch (error: any) {
      $('#deleteFarm').modal('hide');
      this.toastr.error(error.message);
      return;
    }
  }
  getFarmDetailsById(farm: any) {
    this.farmDataById = farm;
    this.activePage = "edit-farm"
    this.mode = constVariable.EDIT
  }

  getFarmById(farm: any) {
    this.farmDataById = farm;
  }

  pageChange(num: any) {
    this.page = num;
    if(this.page>1){
      this.rowIndex = 1+ ((this.page-1)*this.pageSize)
    }else{
      this.rowIndex = 1
    }
    this.getFarms()
  }

  moveToAddCrop() {
    this.activePage = "add-farm";
    this.mode = constVariable.ADD
  }

  redirectToCropTypePage() {
    this.activePage = "farms";
    this.getFarms()
  }

  search(e: any) {
    this.searchText = e.target.value
    this.getFarms();
  }

  changeNum(e: any){
    this.limit = e.target.value
    this.page = 1
    this.getFarms()
  }

}
