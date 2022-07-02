import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CropTypeService } from 'src/app/core/http/api/crop-type.service';
import { constVariable } from 'src/environments/const';
import { message } from 'src/environments/en';

@Component({
  selector: 'app-add-edit-crop-type',
  templateUrl: './add-edit-crop-type.component.html',
  styleUrls: ['./add-edit-crop-type.component.css']
})
export class AddEditCropTypeComponent implements OnInit {

  @Input() cropTypeInfo: any;
  @Output() cancelEvent = new EventEmitter()
  @Input() mode: any

  updateCropTypeForm: FormGroup = new FormGroup({
    cropTypeName: new FormControl(''),
  })
  newCropTypeForm: FormGroup = new FormGroup({
    cropTypeName: new FormControl(''),
  })

  isSubmitted: boolean = false;
  cropTypeId: any;
  cropTypeNameRequired = message.cropType.cropTypeNameRequired

  constructor(private fb: FormBuilder, private toastr: ToastrService, private cropTypeService: CropTypeService) {
    this.updateCropTypeForm = this.fb.group({
      cropTypeName: ['', Validators.required],
    })
    this.newCropTypeForm = this.fb.group({
      cropTypeName: ['', Validators.required],
    })
  }

  get f(): { [key: string]: AbstractControl } {
    return this.newCropTypeForm.controls;
  }
  get b(): { [key: string]: AbstractControl } {
    return this.updateCropTypeForm.controls;
  } 

  ngOnInit(): void {
    if (this.mode == constVariable.EDIT) {
      this.cropTypeId = this.cropTypeInfo._id;
      this.updateCropTypeForm.patchValue({
        cropTypeName: this.cropTypeInfo.cropTypeName,
      })
    }
  }

  updateCropType() {
    try {
      this.isSubmitted = true
      if (!this.updateCropTypeForm.valid) {
        return
      }
      this.cropTypeService.updateCropType(this.cropTypeId, this.updateCropTypeForm.value).subscribe((res: any) => {
        if (res.status == constVariable.SUCCESS) {
          this.toastr.success(message.cropType.cropTypeUpdated);
          this.updateCropTypeForm.reset()
          this.backTolisting()
        } else {
          this.toastr.error(res.error.errors.message);
        }
      })
    } catch (error: any) {
      this.toastr.error(error.message);
    }
  }

  createCropType() {
    try {
      this.isSubmitted = true
      if (!this.newCropTypeForm.valid) {
        return;
      }
      this.cropTypeService.createCropType(this.newCropTypeForm.value).subscribe((res: any) => {
        if (res.status == constVariable.SUCCESS) {
          this.toastr.success(message.cropType.cropTypeCreated);
          this.backTolisting()
          this.newCropTypeForm.reset()
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
