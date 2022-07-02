import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CropTypeService } from 'src/app/core/http/api/crop-type.service';
import { CropsService } from 'src/app/core/http/api/crops.service';
import { constVariable } from 'src/environments/const';
import { message } from 'src/environments/en';

@Component({
  selector: 'app-add-edit-crops',
  templateUrl: './add-edit-crops.component.html',
  styleUrls: ['./add-edit-crops.component.css']
})
export class AddEditCropsComponent implements OnInit {

  @Input() cropById: any;
  @Output() cancelEvent = new EventEmitter()
  @Input() mode: any

  cropData: Array<any> = [];
  newCropForm: FormGroup
  updateCropForm: FormGroup
  editImg = ''

  isSubmitted: boolean = false;
  cropNameRequired = message.crop.cropNameRequired
  cropTypeRequired = message.crop.cropTypeRequired
  cropImageRequired = message.crop.cropImageRequired
  cropTypeData: Array<any> = [];
  imageFile: any;
  cropTypeName: any;
  imageSrc: any;
  editImageFile: any

  constructor(private fb: FormBuilder, private toastr: ToastrService, private cropsService: CropsService, private cropTypeService: CropTypeService) {
    this.newCropForm = this.fb.group({
      cropName: ['', Validators.required],
      cropType: ['', Validators.required],
      cropImage: ['', Validators.required],
    })

    this.updateCropForm = this.fb.group({
      cropName: ['', Validators.required],
      cropType: ['', Validators.required],
      cropImage: ['', Validators.required],
    })
  }

  get f(): { [key: string]: AbstractControl } {
    return this.newCropForm.controls;
  }

  get b(): { [key: string]: AbstractControl } {
    return this.updateCropForm.controls;
  }

  ngOnInit(): void {
    if (this.mode == constVariable.EDIT) {
      this.updateCropForm.patchValue({
        cropName: this.cropById.cropName,
        cropType: this.cropById.cropType,
        cropImage: this.cropById.cropImage,
      })
    }
    this.getAllCropType()
  }
  getAllCropType() {
    try {
      this.cropTypeService.getCropType().subscribe((res: any) => {
        if (res.status == constVariable.SUCCESS) {
          this.cropTypeData = res.data.data;
        }
        else {
          this.toastr.error(res.error.errors.message);
        }
      })
    } catch (error: any) {
      this.toastr.error(error.message);
    }
  }
  createCrop() {
    try {
      this.isSubmitted = true
      if (!this.newCropForm.valid) {
        return;
      }
      let fd: FormData = new FormData();
      fd.append('cropName', this.newCropForm.value.cropName);
      fd.append('cropType', this.newCropForm.value.cropType)
      fd.append('cropImage', this.imageFile);
      this.cropsService.createCrop(fd).subscribe((res: any) => {
        console.log(res.message)
        if (res.status == constVariable.SUCCESS) {
          this.toastr.success(message.crop.cropCreated);
          this.backTolisting();
        } if (res.status == constVariable.ERROR) {
          this.toastr.error(res.message);
        } else {
          this.toastr.error(res.error.errors.message);
        }
      })

    } catch (error: any) {
      this.toastr.error(error.message);
    }
  }

  uploadImage(event: any) {
    this.imageFile = event.target.files[0];
  }

  updateCrop() {
    try {
      this.isSubmitted = true
      if (!this.updateCropForm.valid) {
        return;
      }
      let fd: FormData = new FormData();
      fd.append('cropName', this.updateCropForm.value.cropName);
      fd.append('cropType', this.updateCropForm.value.cropType)
      if (this.editImageFile != undefined) {
        fd.append('cropImage', this.editImageFile);
      }
      this.cropsService.updateCrop(this.cropById._id, fd).subscribe((res: any) => {
        if (res.status == constVariable.SUCCESS) {
          this.toastr.success(message.crop.cropUpdated);
          this.backTolisting();
        } else {
          this.toastr.error(res.error.errors.message);
        }
      })
    } catch (error: any) {
      this.toastr.error(error.message);
    }
  }

  textchange(event: any) {
    this.cropTypeName = event.target.value
  }

  backTolisting() {
    this.cancelEvent.emit();
  }

  editImage(event: any) {
    this.editImg = 'editImage'
    this.editImageFile = event.target.files[0]
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = e => this.imageSrc = reader.result;
    reader.readAsDataURL(file);

  }

}
