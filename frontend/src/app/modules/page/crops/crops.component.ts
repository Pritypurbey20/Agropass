import { Component, OnInit } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { message } from 'src/environments/en';
import { constVariable } from '../../../../environments/const';
import { CropsService } from 'src/app/core/http/api/crops.service';
declare var $: any;

@Component({
  selector: 'app-crops',
  templateUrl: './crops.component.html',
  styleUrls: ['./crops.component.css']
})
export class CropsComponent implements OnInit {

  cropData: Array<any> = [];
  cropById: any;
  totalRecords: any;
  page = 1;
  rowIndex = 1;
  pageSize = 3;
  limit: any;
  activePage: string = 'crops';
  mode = '';
  searchText: any = "";
  Num: any = ['5', '10', '50']

  constructor(private toastr: ToastrService, private cropsService: CropsService) {
  }

  ngOnInit(): void {
    this.getCrops();
  }

  getCrops() {
    try {
      let params = new HttpParams();
      params = params.append('page', this.page);
      params = params.append('limit', this.limit || this.Num[0]);
      params = params.append('search', this.searchText);
      params = params.append('modelName', 'crops');

      this.cropsService.getCrops(params).subscribe((res: any) => {
        if (res.status == constVariable.SUCCESS) {
          this.cropData = res.data.data;
          this.totalRecords = res.data.records
        } else {
          this.toastr.error(res.error.errors.message);
        }
      })
    } catch (error: any) {
      this.toastr.error(error.message);
    }
  }

  deleteCrop() {
    try {
      $('#deleteCrop').modal('hide');
      this.cropsService.deleteCrop(this.cropById._id).subscribe((res: any) => {
        if (res.status == constVariable.SUCCESS) {
          this.toastr.success(message.crop.cropDeleted);
          this.getCrops();
        } else {
          this.toastr.error(res.error.errors.message);
        }
      })
    } catch (error: any) {
      $('#deleteCrop').modal('hide');
      this.toastr.error(error.message);
      return
    }
  }

  pageChange(e: any) {
    this.page = e;
    if (this.page > 1) {
      this.rowIndex = 1 + ((this.page - 1) * this.pageSize)
    } else {
      this.rowIndex = 1
    }
    this.getCrops();
  }

  changeNum(e: any) {
    this.limit = e.target.value;
    this.getCrops();
  }

  getCropById(crop: any) {
    this.cropById = crop
    this.activePage = "edit-crop"
    this.mode = constVariable.EDIT
  }

  moveToAddCrop() {
    this.activePage = "add-crop";
    this.mode = constVariable.ADD
  }

  redirectToCropTypePage() {
    this.activePage = "crops";
    this.getCrops()
  }

  getCropDetails(crop: any) {
    this.cropById = crop
  }

  search(e: any) {
    this.searchText = e.target.value
    this.getCrops();
  }

}
