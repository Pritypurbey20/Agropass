import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { message } from 'src/environments/en';
import { ToastrService } from 'ngx-toastr';
import { DistilleryService } from 'src/app/core/http/api/distillery.service';
import { constVariable } from 'src/environments/const';
import { UsersService } from 'src/app/core/http/api/users.service';
import { CropTypeService } from 'src/app/core/http/api/crop-type.service';


@Component({
  selector: 'app-add-edit-distillery',
  templateUrl: './add-edit-distillery.component.html',
  styleUrls: ['./add-edit-distillery.component.css']
})
export class AddEditDistilleryComponent implements OnInit {

  @Input() distilleryDataById: any;
  @Output() cancelEvent = new EventEmitter()
  @Input() mode: any

  newDistilleryForm = new FormGroup({
    distilleryOwnerId: new FormControl(''),
    distilleryBatchFor: new FormControl(''),
    dispatchDate: new FormControl(''),
  })

  updateDistilleryForm = new FormGroup({
    distilleryOwnerId: new FormControl(''),
    distilleryBatchFor: new FormControl(''),
    dispatchDate: new FormControl(''),
  })

  isSubmitted: boolean = false
  dispatchDateRequired = message.distillery.dispatchDateRequired;
  distilleryOwnerIdRequired = message.distillery.distilleryOwnerIdRequired;
  distilleryBatchForRequired = message.distillery.distilleryBatchForRequired;
  userData: Array<any> = [];
  cropTypeData: Array<any> = [];
  user: any;
  userFirstname: any;
  distilleryInfo : Array<any> = [];


  constructor(private fb: FormBuilder, private toastr: ToastrService, private distilleryService: DistilleryService, private usersService: UsersService ,private cropTypeService: CropTypeService) {
    this.newDistilleryForm = this.fb.group({
      distilleryOwnerId: ["", [Validators.required]],
      distilleryBatchFor: ["", [Validators.required]],
      dispatchDate: ["", [Validators.required]],
    })

    this.updateDistilleryForm = this.fb.group({
      distilleryOwnerId: ["", [Validators.required]],
      distilleryBatchFor: ["", [Validators.required]],
      dispatchDate: ["", [Validators.required]],
    })
  }

  get f(): { [key: string]: AbstractControl } {
    return this.newDistilleryForm.controls;
  }

  get b(): { [key: string]: AbstractControl } {
    return this.updateDistilleryForm.controls;
  }

  ngOnInit(): void {
    this.getAllCropType()
    this.getAllUsers();
    if (this.mode === 'edit') {
      this.updateDistilleryForm.patchValue({
        distilleryOwnerId: this.distilleryDataById.distilleryOwnerId._id,
        distilleryBatchFor: this.distilleryDataById.distilleryBatchFor,
        dispatchDate: new Date(this.distilleryDataById.dispatchDate).toISOString().split('T')[0],
      })
    }
  }

  getAllCropType() {
    try {
      this.cropTypeService.getCropType().subscribe((res: any) => {
        if (res.status == constVariable.SUCCESS) {
          this.cropTypeData = res.data.data;
        } else {
          this.toastr.error(res.error.errors.message);
        }
      })
    } catch (error: any) {
      this.toastr.error(error.message);
    }
  }

  createDistillery() {
    try {
      this.isSubmitted = true;
      if (this.newDistilleryForm.invalid) {
        return;
      }
      const body = {
        distilleryOwnerId: this.newDistilleryForm.value.distilleryOwnerId,
        distilleryBatchFor: this.newDistilleryForm.value.distilleryBatchFor,
        dispatchDate: this.newDistilleryForm.value.dispatchDate,
        distilleryBatchId : `${this.userFirstname}-${this.newDistilleryForm.value.distilleryBatchFor}-${new Date().getTime()}-${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`
      }
      console.log(body)
      this.distilleryService.createDistillery(body).subscribe((res: any) => {
        if (res.status === constVariable.SUCCESS) {
          this.toastr.success(message.distillery.distilleryCreated)
          this.backTolisting()
        } else {
          this.toastr.error(res.error.errors.message)
        }
      })
    } catch (error: any) {
      this.toastr.error(error.message);
      return;
    }
  }

  updateDistillery() {
    try {
      this.isSubmitted = true;
      if (this.updateDistilleryForm.invalid) {
        return;
      }
      const body = {
        distilleryOwnerId: this.user,
        distilleryBatchFor: this.updateDistilleryForm.value.distilleryBatchFor,
        dispatchDate: this.updateDistilleryForm.value.dispatchDate,
        distilleryBatchId : `${this.userFirstname}-${this.updateDistilleryForm.value.distilleryBatchFor}-${new Date().getTime()}-${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`
      }
      this.distilleryService.updateDistillery(this.distilleryDataById._id, body).subscribe((res: any) => {
        if (res.status === constVariable.SUCCESS) {
          this.toastr.success(message.distillery.distilleryUpdated)
          this.backTolisting()
        } else {
          this.toastr.error(res.error.errors.message)
        }
      })
    } catch (error: any) {
      this.toastr.error(error.message);
      return;
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

  getUser(event: any) {
    this.user = event.target.value;
    this.userFirstname = this.userData.filter(function (user: any) {
      return user["_id"] ==  event.target.value
    })[0].firstName
  }

  backTolisting() {
    this.cancelEvent.emit();
  }
}
