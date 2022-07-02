import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { constVariable } from 'src/environments/const';
import { message } from 'src/environments/en';
import { PurchaseService } from 'src/app/core/http/api/purchase.service';
import { UsersService } from 'src/app/core/http/api/users.service';
import { DistilleryService } from 'src/app/core/http/api/distillery.service';
import { regex } from 'src/environments/regex';
@Component({
  selector: 'app-add-edit-purchase',
  templateUrl: './add-edit-purchase.component.html',
  styleUrls: ['./add-edit-purchase.component.css']
})
export class AddEditPurchaseComponent implements OnInit {

  @Output() cancelEvent = new EventEmitter()
  @Input() purchaseDataById: any;
  @Input() mode: any

  newPurchaseForm: FormGroup = new FormGroup({
    userName: new FormControl(''),
    farmer: new FormControl(''),
    quantity: new FormControl(''),
    quality: new FormControl(''),
    pricePerUnit: new FormControl(''),
    inceptionDate: new FormControl(''),
    inceptionResult: new FormControl(''),
    revisedPricePerUnit: new FormControl(''),
    notes: new FormControl(''),
    distilleryBatch: new FormControl(''),
    deliveryDateToDistillery: new FormControl(''),
  })

  UpdatePurchaseForm: FormGroup = new FormGroup({
    userName: new FormControl(''),
    farmer: new FormControl(''),
    quantity: new FormControl(''),
    quality: new FormControl(''),
    pricePerUnit: new FormControl(''),
    inceptionDate: new FormControl(''),
    inceptionResult: new FormControl(''),
    revisedPricePerUnit: new FormControl(''),
    notes: new FormControl(''),
    distilleryBatch: new FormControl(''),
    deliveryDateToDistillery: new FormControl(''),
  })

  isSubmitted: boolean = false;
  onlyNumber = regex.onlyNumber;
  userNameRequired = message.purchase.userNameRequired;
  farmerRequired = message.purchase.farmerRequired;
  quantityRequired = message.purchase.quantityRequired;
  qualityRequired = message.purchase.qualityRequired;
  pricePerUnitRequired = message.purchase.pricePerUnitRequired;
  inceptionDateRequired = message.purchase.inceptionDateRequired;
  inceptionResultRequired = message.purchase.inceptionResultRequired;
  revisedPriceRequired = message.purchase.revisedPriceRequired;
  distilleryBatchRequired = message.purchase.distilleryBatchRequired;
  deliveryDateToDistilleryRequired = message.purchase.deliveryDateToDistilleryRequired;
  numbersOnly = message.purchase.numbersOnly;

  distilleryData: Array<any> = [];
  userData: Array<any> = [];
  user: any;
  checkedValue = 'true';
  userFirstname: any;


  constructor(private fb: FormBuilder, private toastr: ToastrService, private purchaseService: PurchaseService, private usersService: UsersService, private distilleryService: DistilleryService) {
    this.newPurchaseForm = this.fb.group({
      userName: ['', Validators.required],
      farmer: ['', Validators.required],
      quantity: ['', [Validators.required , Validators.pattern(this.onlyNumber)]],
      quality: ['', Validators.required],
      pricePerUnit: ['', [Validators.required , Validators.pattern(this.onlyNumber)]],
      inceptionDate: ['', Validators.required],
      inceptionResult: ['', Validators.required],
      revisedPricePerUnit: ['', Validators.pattern(this.onlyNumber)],
      notes: [''],
      distilleryBatch: ['', Validators.required],
      deliveryDateToDistillery: ['', Validators.required],
    })

    this.UpdatePurchaseForm = this.fb.group({
      userName: ['', Validators.required],
      farmer: ['', Validators.required],
      quantity: ['', [Validators.required , Validators.pattern(this.onlyNumber)]],
      quality: ['', Validators.required],
      pricePerUnit: ['', [Validators.required , Validators.pattern(this.onlyNumber)]],
      inceptionDate: ['', Validators.required],
      inceptionResult: ['', Validators.required],
      revisedPricePerUnit: ['', Validators.pattern(this.onlyNumber)],
      notes: [''],
      distilleryBatch: ['', Validators.required],
      deliveryDateToDistillery: ['', Validators.required],
    })
  }


  get f(): { [key: string]: AbstractControl } {
    return this.newPurchaseForm.controls;
  }

  get b(): { [key: string]: AbstractControl } {
    return this.UpdatePurchaseForm.controls;
  }

  ngOnInit(): void {
    this.getAllUsers();
    this.getAllDistillery();
    if (this.mode == 'edit') {
      console.log(this.purchaseDataById);
      this.UpdatePurchaseForm.patchValue({
        userName: this.purchaseDataById.userName._id,
        farmer: this.purchaseDataById.farmer._id,
        quantity: this.purchaseDataById.quantity,
        quality: this.purchaseDataById.quality,
        pricePerUnit: this.purchaseDataById.pricePerUnit,
        inceptionDate: new Date(this.purchaseDataById.inceptionDate).toISOString().split('T')[0],
        revisedPricePerUnit: this.purchaseDataById.revisedPricePerUnit,
        notes: this.purchaseDataById.notes,
        distilleryBatch: this.purchaseDataById.distilleryBatch._id,
        deliveryDateToDistillery: new Date(this.purchaseDataById.deliveryDateToDistillery).toISOString().split('T')[0],
      })
    }
  }

  backTolisting() {
    this.cancelEvent.emit();
  }

  createPurchase() {
    try {
      this.isSubmitted = true;
      if (this.newPurchaseForm.invalid) {
        return;
      }

      const body = {
        userName: this.newPurchaseForm.value.userName,
        farmer: this.newPurchaseForm.value.farmer,
        quantity: this.newPurchaseForm.value.quantity,
        quality: this.newPurchaseForm.value.quality,
        pricePerUnit: this.newPurchaseForm.value.pricePerUnit,
        inceptionDate: this.newPurchaseForm.value.inceptionDate,
        inceptionResult: this.newPurchaseForm.value.inceptionResult, 
        revisedPricePerUnit: (this.newPurchaseForm.value.revisedPricePerUnit === null) ? this.newPurchaseForm.value.pricePerUnit : this.newPurchaseForm.value.revisedPricePerUnit,
        notes: this.newPurchaseForm.value.notes,
        distilleryBatch: this.newPurchaseForm.value.distilleryBatch,
        deliveryDateToDistillery: this.newPurchaseForm.value.deliveryDateToDistillery,
        purchaseId : `${this.userFirstname}-${this.newPurchaseForm.value.deliveryDateToDistillery}-${new Date().getTime()}-${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`
      }
      console.log(body);
      this.purchaseService.createPurchase(body).subscribe((res: any) => {
        console.log(res);
        if (res.status == 'success') {
          this.toastr.success(message.purchase.purchaseCreated);
          this.cancelEvent.emit();
        } else {
          this.toastr.error(res.error.errors.message);
        }
      })

    } catch (error: any) {
      this.toastr.error(error.message);
    }
  }

  updatePurchase() {
    try {
      this.isSubmitted = true;
      if (this.UpdatePurchaseForm.invalid) {
        return;
      }
      const body = {
        userName: this.UpdatePurchaseForm.value.userName,
        farmer: this.UpdatePurchaseForm.value.farmer,
        quantity: this.UpdatePurchaseForm.value.quantity,
        quality: this.UpdatePurchaseForm.value.quality,
        pricePerUnit: this.UpdatePurchaseForm.value.pricePerUnit,
        inceptionDate: this.UpdatePurchaseForm.value.inceptionDate,
        inceptionResult: this.UpdatePurchaseForm.value.inceptionResult || this.purchaseDataById.inceptionResult,
        revisedPricePerUnit: this.UpdatePurchaseForm.value.revisedPricePerUnit,
        notes: this.UpdatePurchaseForm.value.notes,
        distilleryBatch: this.UpdatePurchaseForm.value.distilleryBatch,
        deliveryDateToDistillery: this.UpdatePurchaseForm.value.deliveryDateToDistillery,
        purchaseId : `${this.userFirstname}-${this.UpdatePurchaseForm.value.deliveryDateToDistillery}-${new Date().getTime()}-${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`
      }
      this.purchaseService.updatePurchase(this.purchaseDataById._id, body).subscribe((res: any) => {
        if (res.status == constVariable.SUCCESS) {
          this.toastr.success(message.purchase.purchaseUpdated);
          this.cancelEvent.emit();
        } else {
          this.toastr.error(res.error.errors.message);
        }
      })
    } catch (error: any) {
      this.toastr.error(error.message);
    }
  }
  getAllUsers() {
    try {
      this.usersService.getUser().subscribe((res: any) => {
        if (res.status == constVariable.SUCCESS) {
          const allUsers = res.data.data;
          this.userData = allUsers.filter(function (user: any) {
            return user["active"] == true;
          })
        } else {
          this.toastr.error(res.error.errors.message)
        }
      })
    } catch (error: any) {
      this.toastr.error(error.message);
      return;
    }
  }

  getFarmer(event: any) {
    this.user = event.target.value;
    this.userFirstname = this.userData.filter(function (user: any) {
      return user["_id"] ==  event.target.value
    })[0].firstName
  }

  getAllDistillery() {
    try {
      this.distilleryService.getDistillery().subscribe((res: any) => {
        if (res.status == constVariable.SUCCESS) {
          this.distilleryData = res.data.data;
        } else {
          this.toastr.error(res.error.errors.message)
        }
      })

    } catch (error: any) {
      this.toastr.error(error.message);
      return;
    }
  }
}
