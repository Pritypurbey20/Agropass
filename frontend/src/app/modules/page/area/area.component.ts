import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { constVariable } from 'src/environments/const';
import { message } from 'src/environments/en';
import { HttpParams } from '@angular/common/http';
import { AreaService } from 'src/app/core/http/api/area.service';

declare var $: any;

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css']
})
export class AreaComponent implements OnInit {

  areaData: Array<any> = [];
  activePage: string = "area"
  isSubmitted: boolean = false;
  areaId: any;
  areaInfo: any;
  mode = '';
  totalRecords: any;
  page = 1;
  rowIndex = 1;
  pageSize = 3;
  searchText: any = "";
  Num: any = ['5', '10', '50']
  limit: any;


  constructor(private toastr: ToastrService, private areaService: AreaService) { }

  ngOnInit(): void {
    this.getArea();
  }

  getArea() {
    try {
      let params = new HttpParams();
      params = params.append('page', this.page);
      params = params.append('limit', this.limit || this.Num[0]);
      params = params.append('search', this.searchText);
      params = params.append('modelName', 'area');
      this.areaService.getArea(params).subscribe((res: any) => {
        if (res.status == constVariable.SUCCESS) {
          this.areaData = res.data.data;
          this.totalRecords = res.data.records;
        } else {
          this.toastr.error(res.error.errors.message);
        }
      })
    } catch (error: any) {
      this.toastr.error(error.message);
    }
  }


  deleteArea() {
    try {
      $('#deleteArea').modal('hide');
      this.areaService.deleteArea(this.areaId).subscribe((res: any) => {
        if (res.status == constVariable.SUCCESS) {
          this.toastr.success(message.area.areaDeleted)
          this.getArea()
        } else {
          this.toastr.error(res.error.errors.message)
        }
      })
    } catch (error: any) {
      this.toastr.error(error.message)
    }
  }

  getAreaById(area: any) {
    this.areaInfo = area
    this.activePage = "edit-area"
    this.mode = constVariable.EDIT
  }

  getAreaDetailsId(area: any) {
    this.areaId = area._id
  }

  pageChange(num: any) {
    this.page = num;
    if (this.page > 1) {
      this.rowIndex = 1 + ((this.page - 1) * this.pageSize)
    } else {
      this.rowIndex = 1
    }
    this.getArea();
  }

  changeNum(e: any) {
    this.limit = e.target.value;
    this.getArea();
  }

  redirectToAreaPage() {
    this.activePage = "area";
    this.getArea()
  }

  search(e: any) {
    this.searchText = e.target.value
    this.getArea();
  }

  moveToAddArea() {
    this.activePage = 'add-area'
    this.mode = constVariable.ADD
  }

}
