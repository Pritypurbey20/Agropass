import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { constVariable } from 'src/environments/const';
import { message } from 'src/environments/en';
import { PaymentService } from 'src/app/core/http/api/payment.service';
import { UsersService } from 'src/app/core/http/api/users.service';
import { PurchaseService } from 'src/app/core/http/api/purchase.service';
@Component({
  selector: 'app-add-edit-payment',
  templateUrl: './add-edit-payment.component.html',
  styleUrls: ['./add-edit-payment.component.css']
})
export class AddEditPaymentComponent implements OnInit {

  @Input() paymentDataById: any;
  @Output() cancelEvent = new EventEmitter()
  @Input() mode: any

  newPaymentForm: FormGroup = new FormGroup({
    purchaseId: new FormControl(''),
    paymentMode: new FormControl(''),
    dateOfPurchase: new FormControl(''),
    amount: new FormControl(''),
  })

  isSubmitted: boolean = false;
  paymentModeRequired = message.payment.paymentModeRequired;
  paymentStatusRequired = message.payment.paymentStatusRequired;
  purchaseIdRequired = message.payment.purchaseIdRequired;
  dateOfPurchaseRequired = message.payment.dateOfPurchaseRequired;
  amountRequired = message.payment.amountRequired;
  allPurchases: Array<any> = [];

  constructor(private fb: FormBuilder, private toastr: ToastrService, private userService: UsersService, private paymentService: PaymentService, private purchaseService: PurchaseService) {
    this.newPaymentForm = this.fb.group({
      purchaseId: ['', Validators.required],
      paymentMode: ['', Validators.required],
      dateOfPurchase: ['', Validators.required],
      amount: ['', Validators.required],
    })
  }

  get f(): { [key: string]: AbstractControl } {
    return this.newPaymentForm.controls;
  }

  ngOnInit(): void {
    this.getAllPurchase()
  }

  getAllPurchase() {
    try {
      this.purchaseService.getPurchase().subscribe((res: any) => {
        this.allPurchases = res.data.data;
        console.log(this.allPurchases)
      })
    } catch (error: any) {
      this.toastr.error(error.message);
      return;
    }
  }

  createPayment() {
    try {
      this.isSubmitted = true;
      if (this.newPaymentForm.invalid) {
        return;
      }

      console.log(this.newPaymentForm.value)
      this.paymentService.createPayment(this.newPaymentForm.value).subscribe((res: any) => {
        if (res.status == constVariable.SUCCESS) {
          this.toastr.success(message.payment.paymentSuccess);
          this.cancelEvent.emit();
        } else {
          this.toastr.error(res.error.errors.message)
        }
      })

    } catch (error: any) {
      this.toastr.error(error.message);
      return;
    }
  }

  backTolisting() {
    this.cancelEvent.emit();
  }

  getAmount(event: any) {
    console.log(event.target.value)
    const purchase = this.allPurchases.filter(function (purchase: any) {
      return purchase._id == event.target.value;
    })
    console.log(purchase)
    this.newPaymentForm.patchValue({
      amount: purchase[0].amount
    })
  }
}
