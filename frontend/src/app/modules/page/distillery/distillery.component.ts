import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { constVariable } from 'src/environments/const';
import { message } from 'src/environments/en';
import { HttpParams } from '@angular/common/http';
import { DistilleryService } from 'src/app/core/http/api/distillery.service';
declare var $: any;
@Component({
  selector: 'app-distillery',
  templateUrl: './distillery.component.html',
  styleUrls: ['./distillery.component.css']
})
export class DistilleryComponent implements OnInit {

  distilleryData: Array<any> = []
  distilleryDataById: any;
  limit: any;
  activePage: string = 'distillery';
  mode = '';
  totalRecords: any;
  page = 1;
  rowIndex = 1;
  pageSize = 3;
  searchText: any = "";
  Num: any = ['5' , '10' , '50']
  distilleryInfo : any = []

  constructor(private toastr: ToastrService , private distilleryService : DistilleryService) { }

  ngOnInit(): void {
    this.getDistillery();
  }

  getDistillery() {
    try {
      let params = new HttpParams();
      params = params.append('page', this.page);
      params = params.append('limit', this.limit || this.Num[0]);
      params = params.append('search', this.searchText);
      params = params.append('modelName' , 'distillery');
      this.distilleryService.getDistillery(params).subscribe((res: any) => {
        console.log(res)
        if (res.status == constVariable.SUCCESS) {
          this.distilleryData = res.data.data;
          this.totalRecords = res.data.records
        } else {
          this.toastr.error(res.error.errors.message);
        }
      })
    } catch (error: any) {
      this.toastr.error(error.message);
      return
    }
  }

  getDistilleryInfo(){
    try{
      this.distilleryService.distilleryBatchInfo().subscribe((res: any) => {
        if (res.status == constVariable.SUCCESS) {
         this.distilleryInfo = res.data.data;
        } else {
          this.toastr.error(res.error.errors.message)
        }
      })

    }catch(error:any){
      this.toastr.error(error.message)
    }
  }

  deleteDistillery() {
    try {
      $('#deleteDistillery').modal('hide');
      this.distilleryService.deleteDistillery(this.distilleryDataById._id).subscribe((res: any) => {
        if (res.status == constVariable.SUCCESS) {
          this.toastr.success(message.distillery.distilleryDeleted);
          this.getDistillery();
        } else {
          this.toastr.error(res.error.errors.message);
        }
      })
    } catch (error: any) {
      $('#deleteFarm').modal('hide');
      this.toastr.error(error.message);
      return
    }
  }

  getDistelleryDetailsById(distillery:any){
    this.distilleryDataById = distillery;
    this.activePage = 'edit-distillery';
    this.mode = constVariable.EDIT
  }

  getDistilleryData(distillery:any){
    this.distilleryDataById = distillery;
    this.activePage = 'distillery';
  }

  pageChange(num: any) {
    this.page = num;
    if(this.page>1){
      this.rowIndex = 1+ ((this.page-1)*this.pageSize)
    }else{
      this.rowIndex = 1
    }
    this.getDistillery()
  }

  moveToAddDistillery(){
    this.activePage = 'add-distillery';
    this.mode = constVariable.ADD;
  }

  redirectToDistilleryPage(){
    this.activePage = 'distillery';
    this.mode = '';
    this.getDistillery()
  }

  search(e: any) {
    this.searchText = e.target.value
    this.getDistillery();
  }

  changeNum(e: any){
    this.limit = e.target.value
    this.page = 1
    this.getDistillery()
  }
}
