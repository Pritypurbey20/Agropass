import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { constVariable } from '../../../../environments/const';
import { message } from '../../../../environments/en';
import { HttpParams } from '@angular/common/http';
import {CropTypeService} from '../../../core/http/api/crop-type.service';

declare var $: any;
@Component({
  selector: 'app-crop-type',
  templateUrl: './crop-type.component.html',
  styleUrls: ['./crop-type.component.css']
})
export class CropTypeComponent implements OnInit {

  cropTypeData: Array<any> = [];
  activePage: string = "cropType";
  cropTypeInfo: any
  cropTypeId: any;
  mode = '';
  limit: any;
  totalRecords: any;
  page = 1;
  rowIndex = 1;
  pageSize = 3;
  searchText: any = "";
  Num: any = ['5' , '10' , '50']
  cropTypeName : any = ""

  constructor(private toastr: ToastrService , private cropTypeService : CropTypeService) { }

  ngOnInit(): void {
    this.getCropType()
  }

  getCropType() {
    try {
      let params = new HttpParams();
      params = params.append('page', this.page);
      params = params.append('limit', this.limit || this.Num[0]);
      params = params.append('search', this.searchText);
      params = params.append('modelName' , 'croptype');
      this.cropTypeService.getCropType(params).subscribe((res: any) => {
        if (res.status == constVariable.SUCCESS) {
          this.cropTypeData = res.data.data;
          this.totalRecords = res.data.records
        } else {
          this.toastr.error(res.error.errors.message);
        }
      })
    } catch (error: any) {
      this.toastr.error(error.message);
    }
  }

  getCropTypeById(cropType: any) {
    this.cropTypeInfo = cropType
    this.activePage = "edit-cropType"
    this.mode = constVariable.EDIT
  }

  moveToAddCropTypePage() {
    this.activePage = "add-cropType";
    this.mode = constVariable.ADD
  }

  getCropTypeByDetails(cropType:any){
    this.cropTypeId = cropType._id
    this.cropTypeName = cropType.cropTypeName
  }

  deleteCropType() {
    try {
      $('#deleteCropType').modal('hide');
      this.cropTypeService.deleteCropType(this.cropTypeId , this.cropTypeName).subscribe((res: any) => {
        if (res.status == constVariable.SUCCESS) {
          this.toastr.success(message.cropType.cropTypeDeleted);
          this.getCropType();
        } else {
          this.toastr.error(res.error.errors.message);
        }
      })
    }catch(error:any){
      $('#deleteCropType').modal('hide');
      this.toastr.error(error.message);
      return;
    }
  }

  pageChange(num: any) {
    this.page = num;
    if(this.page>1){
      this.rowIndex = 1+ ((this.page-1)*this.pageSize)
    }else{
      this.rowIndex = 1
    }
    this.getCropType();
  }

  changeNum(e: any) {
    this.limit = e.target.value;
    this.getCropType();
  }

  search(e: any) {
    this.searchText = e.target.value
    this.getCropType();
  }

  redirectToCropTypePage() {
    this.activePage = "cropType";
    this.getCropType()
  }
}