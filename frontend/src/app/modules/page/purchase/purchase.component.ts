import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { constVariable } from 'src/environments/const';
import { message } from 'src/environments/en';
import { HttpParams } from '@angular/common/http';
import { PurchaseService } from 'src/app/core/http/api/purchase.service';
declare var $: any;
@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {

  purchaseData: Array<any> = []
  purchaseDataById: any;
  limit: any;
  activePage: string = 'purchase';
  mode = '';
  totalRecords: any;
  page = 1;
  rowIndex = 1;
  pageSize = 3;
  searchText: any = "";
  Num: any = ['5', '10', '50']

  constructor(private toastr: ToastrService, private purchaseService: PurchaseService) { }

  ngOnInit(): void {
    this.getPurchase()
  }

  getPurchase() {
    try {
      let params = new HttpParams();
      params = params.append('page', this.page);
      params = params.append('limit', this.limit || this.Num[0]);
      // params = params.append('search', this.searchText);
      // params = params.append('modelName', 'purchase');
      this.purchaseService.getPurchase(params).subscribe((res: any) => {
        if (res.status == constVariable.SUCCESS) {
          this.purchaseData = res.data.data;
          this.totalRecords = res.data.records;
        } else {
          this.toastr.error(res.error.errors.message);
        }
      })
    } catch (error: any) {
      this.toastr.error(error.message);
      return
    }
  }

  deletePurchase() {
    try {
      $('#deletePurchase').modal('hide');
      this.purchaseService.deletePurchase(this.purchaseDataById._id).subscribe((res: any) => {
        if (res.status == constVariable.SUCCESS) {
          this.toastr.success(message.purchase.purchaseDeleted);
          this.getPurchase();
        } else {
          this.toastr.error(res.error.errors.message);
        }
      })
    } catch (error: any) {
      $('#deletePurchase').modal('hide');
      this.toastr.error(error.message);
      return
    }
  }

  getPurchaseDetails(purchase : any){
    this.purchaseDataById = purchase;
    this.activePage = 'edit-purchase';
    this.mode = constVariable.EDIT
  }

  getPurchaseById(purchase: any) {
    this.purchaseDataById = purchase;
  }

  pageChange(num: any) {
    this.page = num;
    if(this.page>1){
      this.rowIndex = 1+ ((this.page-1)*this.pageSize)
    }else{
      this.rowIndex = 1
    }
    this.getPurchase()
  }

  moveToAddPurchase(){
    this.activePage = 'add-purchase';
    this.mode = constVariable.ADD;
  }

  redirectToPurchasePage(){
    this.activePage = 'purchase';
    this.mode = '';
    this.getPurchase()
  }

  search(e: any) {
    this.searchText = e.target.value
    this.getPurchase();
  }

  changeNum(e: any){
    this.limit = e.target.value
    this.page = 1
    this.getPurchase()
  }

}
