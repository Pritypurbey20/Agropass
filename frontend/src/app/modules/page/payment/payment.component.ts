import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { constVariable } from '../../../../environments/const';
import { PaymentService } from 'src/app/core/http/api/payment.service';
import { message } from 'src/environments/en';
declare var $: any;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {


  paymentData: Array<any> = [];
  paymentDataById: any;
  limit: any;
  activePage: string = 'payment';
  mode = '';
  totalRecords: any;
  page = 1;
  rowIndex = 1;
  pageSize = 3;
  searchText: any = "";
  Num: any = ['5' , '10' , '50']

  constructor(private toastr: ToastrService, private paymentService: PaymentService) { }

  ngOnInit(): void {
    this.getPayments();
  }

  getPayments() {
    try {
      this.paymentService.getAllPayments().subscribe((res: any) => {
        if (res.status == constVariable.SUCCESS) {
          this.paymentData = res.data.data;
          console.log(this.paymentData)
        } else {
          this.toastr.error(res.error.errors.message)
        }
      })
    } catch (error: any) {
      this.toastr.error(error.message);
      return;
    }
  }

  deletePayment() {
    try {
      $('#deletePayment').modal('hide');
      this.paymentService.deletePayment(this.paymentDataById._id).subscribe((res: any) => {
        if (res.status == constVariable.SUCCESS) {
          this.toastr.success(message.payment.paymentDeleted)
          this.getPayments()
        } else {
          this.toastr.error(res.error.errors.message)
        }
      })
    } catch (error: any) {
      $('#deletePayment').modal('hide');
      this.toastr.error(error.message);
      return;
    }
  }

  getpaymentData(payment : any){
    this.paymentDataById = payment;
  }

  pageChange(num: any) {
    this.page = num;
    if(this.page>1){
      this.rowIndex = 1+ ((this.page-1)*this.pageSize)
    }else{
      this.rowIndex = 1
    }
    this.getPayments()
  }

  moveToAddPayment(){
    this.activePage = "add-payment"
    this.mode = constVariable.ADD
  }

  redirectToPaymentPage() {
    this.activePage = "payment";
    this.getPayments()
  }

  search(e: any) {
    this.searchText = e.target.value
    this.getPayments();
  }

  changeNum(e: any){
    this.limit = e.target.value
    this.page = 1
    this.getPayments()
  }

}
