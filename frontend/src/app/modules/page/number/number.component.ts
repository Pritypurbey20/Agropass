import { Component, OnInit } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { message } from 'src/environments/en';
import { constVariable } from '../../../../environments/const';
import { AreaNumberService } from 'src/app/core/http/api/area-number.service';
declare var $: any;

@Component({
  selector: 'app-number',
  templateUrl: './number.component.html',
  styleUrls: ['./number.component.css']
})
export class NumberComponent implements OnInit {

  areaNumberData: Array<any> = [];
  areaNumberById: any;
  totalRecords: any;
  page = 1;
  rowIndex = 1;
  pageSize = 3;
  limit: any;
  activePage: string = 'number';
  mode = '';
  searchText: any = "";
  Num: any = ['5', '10', '50']

  constructor(private toastr: ToastrService, private areaNumberService: AreaNumberService) { }

  ngOnInit(): void {
    this.getAreaNumber()
  }

  getAreaNumber() {
    try {
      let params = new HttpParams();
      params = params.append('page', this.page);
      params = params.append('limit', this.limit || this.Num[0]);
      this.areaNumberService.getAreaNumber(params).subscribe((res: any) => {
        if (res.status == constVariable.SUCCESS) {
          this.areaNumberData = res.data.data;
          this.totalRecords = res.data.records;
        } else {
          this.toastr.error(res.error.errors.message);
        }
      })
    } catch (error: any) {
      this.toastr.error(error.message);
    }
  }

  deleteAreaNumber() {
    try{
      $('#deleteAreaNumber').modal('hide');
      this.areaNumberService.deleteAreaNumber(this.areaNumberById._id).subscribe((res: any) => {
        if (res.status == constVariable.SUCCESS) {
          this.toastr.success(message.areaNumber.areaNumberDeleted);
          this.getAreaNumber();
        } else {
          this.toastr.error(res.error.errors.message);
        }
      })
    }catch (error: any) {
      $('#deleteAreaNumber').modal('hide');
      this.toastr.error(error.message);
    }
  }

  getAreaNumberById(areaNumber: any) {
    this.areaNumberById = areaNumber
  }

  getAreaNumberDetails(areaNumber: any) {
    this.areaNumberById = areaNumber
    this.activePage = "edit-number"
    this.mode = constVariable.EDIT
  }

  moveToAdd(){
    this.activePage = "add-number";
    this.mode = constVariable.ADD
  }

  pageChange(e: any) {
    this.page = e;
    if (this.page > 1) {
      this.rowIndex = 1 + ((this.page - 1) * this.pageSize)
    } else {
      this.rowIndex = 1
    }
    this.getAreaNumber();
  }

  changeNum(e: any) {
    this.limit = e.target.value;
    this.getAreaNumber();
  }

  search(e: any) {
    this.searchText = e.target.value
    this.getAreaNumber();
  }

  redirectToListing(){
    this.activePage = "number";
    this.mode = '';
    this.getAreaNumber();
  }

}