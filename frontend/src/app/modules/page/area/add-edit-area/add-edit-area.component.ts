import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { constVariable } from 'src/environments/const';
import { message } from 'src/environments/en';
import { location } from 'src/environments/location';
import { AreaService } from 'src/app/core/http/api/area.service';

@Component({
  selector: 'app-add-edit-area',
  templateUrl: './add-edit-area.component.html',
  styleUrls: ['./add-edit-area.component.css']
})
export class AddEditAreaComponent implements OnInit {

  @Output() cancelEvent = new EventEmitter()
  @Input() areaInfo: any;
  @Input() mode: any

  newAreaForm: FormGroup = new FormGroup({
    areaName: new FormControl(''),
    state: new FormControl(''),
    district: new FormControl(''),
  })

  UpdateAreaForm: FormGroup = new FormGroup({
    areaName: new FormControl(''),
    state: new FormControl(''),
    district: new FormControl(''),
  })

  areaNameRequired = message.area.areaNameRequired;
  stateRequired = message.area.stateRequired;
  districtRequired = message.area.districtRequired;
  isSubmitted: boolean = false;
  loactionData = location
  districtData: Array<any> = [];
  stateData: Array<any> = [];
  data: Array<any> = [];
  stateName = '';
  districtName = '';
  showDiscricts: '' | undefined;


  constructor(private fb: FormBuilder, private toastr: ToastrService , private areaService: AreaService) { 
    this.newAreaForm = this.fb.group({
      areaName: ['', Validators.required],
      state: ['', Validators.required],
      district: ['', Validators.required],
    })

    this.UpdateAreaForm = this.fb.group({
      areaName: ['', Validators.required],
      state: ['', Validators.required,],
      district: ['', Validators.required],
    })
  }

  get f(): { [key: string]: AbstractControl } {
    return this.newAreaForm.controls;
  }

  get b(): { [key: string]: AbstractControl } {
    return this.UpdateAreaForm.controls;
  }

  ngOnInit(): void {
    if (this.mode == constVariable.EDIT) {
      this.getDistrictData()
      this.UpdateAreaForm.patchValue({
        areaName: this.areaInfo.areaName,
        state: this.areaInfo.state,
        district: this.areaInfo.district,
      })
    }
  }

  createArea() {
    try {
      this.isSubmitted = true
      if (!this.newAreaForm.valid) {
        return;
      }
      const body = {
        areaName: this.newAreaForm.value.areaName,
        state: this.stateName,
        district: this.districtName,
      }
      this.areaService.createArea(body).subscribe((res: any) => {
        if (res.status == constVariable.SUCCESS) {
          this.toastr.success(message.area.areaCreated);
          this.backTolisting()
        } else {
          this.toastr.error(res.error.errors.message);
        }
      })
    } catch (error: any) {
      this.toastr.error(error.message);
    }
  }

  updateArea() {
    try {
      this.isSubmitted = true
      if (!this.UpdateAreaForm.valid) {
        return;
      }
      const body = {
        areaName: this.UpdateAreaForm.value.areaName,
        state: this.stateName || this.areaInfo.state,
        district: this.districtName || this.areaInfo.district,
      }
      this.areaService.updateArea(this.areaInfo._id, body).subscribe((res: any) => {
        if (res.status == constVariable.SUCCESS) {
          this.toastr.success(message.area.areaUpdated);
          this.backTolisting()
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

  async stateChange(event: any) {
    this.data = await this.loactionData.states.filter(el => el.state == event.target.value);
    this.stateName = this.data[0]["state"]
    this.districtData = this.data[0]["districts"]
  }

  districtChange(event: any) {
    console.log(event.target.value)
    this.districtName = event.target.value
  }

  getDistrictData() {
    const districtList = this.loactionData.states.filter(el => el.state == this.areaInfo.state);
    this.districtData = districtList[0]["districts"]
  }

}
