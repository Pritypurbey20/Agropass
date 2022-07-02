import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { constVariable } from 'src/environments/const';
import { message } from 'src/environments/en';
import { AreaNumberService } from 'src/app/core/http/api/area-number.service';
import { AreaService } from 'src/app/core/http/api/area.service';
import { countryCode } from 'src/environments/countryCode';

@Component({
  selector: 'app-add-edit-number',
  templateUrl: './add-edit-number.component.html',
  styleUrls: ['./add-edit-number.component.css']
})
export class AddEditNumberComponent implements OnInit {

  @Input() areaNumberById: any;
  @Output() cancelEvent = new EventEmitter()
  @Input() mode: any

  addNumberForm = new FormGroup({
    countyCode : new FormControl(''),
    mobileNumber : new FormControl(''),
    areaId : new FormControl(''),
  })

  updateNumberForm = new FormGroup({
    mobileNumber: new FormControl(''),
    countyCode: new FormControl(''),
    areaId: new FormControl(''),
  })

  isSubmitted: boolean = false;
  areaData: Array<any> = [];
  areaNameRequired = message.areaNumber.areaNameRequired;
  mobileNumberRequired = message.areaNumber.mobileNumberRequired;
  countryCodeRequired = message.areaNumber.countryCodeRequired;
  mobileNumberValidate = message.areaNumber.mobileNumberValidate;
  countryCodeList = countryCode;

  constructor(private fb: FormBuilder, private toastr: ToastrService, private areaService: AreaService, private areaNumberService: AreaNumberService) {
    this.addNumberForm = this.fb.group({
      countyCode: ['', Validators.required],
      mobileNumber: ['', [Validators.required , Validators.minLength(10), Validators.maxLength(10)]],
      areaId: ['', Validators.required],
    })
    this.updateNumberForm = this.fb.group({
      countyCode: ['', Validators.required],
      mobileNumber: ['', [Validators.required , Validators.minLength(10), Validators.maxLength(10)]],
      areaId: ['', Validators.required],
    })
   }

  get f(): { [key: string]: AbstractControl } {
    return this.addNumberForm.controls;
  }
  get b(): { [key: string]: AbstractControl } {
    return this.updateNumberForm.controls;
  }

  ngOnInit(): void {
    console.log(this.mode)
    this.getArea();

    if (this.mode == constVariable.EDIT) {
      console.log(this.areaNumberById)
      this.updateNumberForm.patchValue({
        mobileNumber: this.areaNumberById.mobileNumber,
        countyCode: this.areaNumberById.countyCode,
        areaId: this.areaNumberById.areaId._id,
      })
    }

    if (this.mode == 'add') {
      this.addNumberForm.patchValue({
        countyCode: countryCode.codes[0].dial_code
      })
    }
  }

  createNumber() {
    try {
      this.isSubmitted = true
      if (!this.addNumberForm.valid) {
        return
      }
      this.areaNumberService.createAreaNumber(this.addNumberForm.value).subscribe((res: any) => {
        if (res.status == constVariable.SUCCESS) {
          this.toastr.success(message.areaNumber.areaNumberCreated);
          this.backTolisting()
        } else {
          this.toastr.error(res.error.errors.message);
        }
      })
    } catch (error: any) {
      this.toastr.error(error.message);
    }
  }

  updateNumber() {
    try {
      this.isSubmitted = true
      if (!this.updateNumberForm.valid) {
        return;
      }
      this.areaNumberService.updateAreaNumber(this.areaNumberById._id, this.updateNumberForm.value).subscribe((res: any) => {
        if (res.status == constVariable.SUCCESS) {
          this.toastr.success(message.areaNumber.areaNumberUpdated);
          this.backTolisting()
        } else {
          this.toastr.error(res.error.errors.message);
        }
      })

    } catch (error: any) {
      this.toastr.error(error.message);
    }
  }

  getArea() {
    try {
      this.areaService.getArea().subscribe((res: any) => {
        if (res.status == constVariable.SUCCESS) {
          this.areaData = res.data.data;
        } else {
          this.toastr.error(res.error.errors.message);
        }
      })
    } catch (error: any) {
      this.toastr.error(error.message);
    }
  }

  backTolisting() {
    this.cancelEvent.emit();
  }
}
