import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FarmsService } from 'src/app/core/http/api/farms.service';
import { UsersService } from 'src/app/core/http/api/users.service';
import { constVariable } from 'src/environments/const';
import { message } from 'src/environments/en';
import { regex } from 'src/environments/regex';

@Component({
  selector: 'app-add-edit-farm',
  templateUrl: './add-edit-farm.component.html',
  styleUrls: ['./add-edit-farm.component.css']
})
export class AddEditFarmComponent implements OnInit {

  @Input() farmDataById: any;
  @Output() cancelEvent = new EventEmitter()
  @Input() mode: any

  newFarmForm = new FormGroup({
    farmOwnerName: new FormControl(''),
    farmOwnerId: new FormControl(''),
    latitude: new FormControl(''),
    longitude: new FormControl(''),
  })

  updateFarmForm = new FormGroup({
    farmOwnerName: new FormControl(''),
    latitude: new FormControl(''),
    longitude: new FormControl(''),
  })

  latlongValidation = regex.latlongRegex;
  invalidLatitude = message.validation.invalidLatitude;
  invalidLongitude = message.validation.invalidLongitude;
  latRequired = message.farm.latRequired
  longRequired = message.farm.longRequired
  selectUser = message.farm.selectUser
  numberValidation = message.validation.onlyNumbers
  isSubmitted: boolean = false
  userData: Array<any> = [];
  user: any;

  constructor(private usersService: UsersService, private fb: FormBuilder, private toastr: ToastrService ,  private farmService : FarmsService) {
    this.newFarmForm = this.fb.group({
      farmOwnerId: ["", [Validators.required]],
      latitude: ["", [Validators.required]],
      longitude: ["", [Validators.required]],
    })

    this.updateFarmForm = this.fb.group({
      farmOwnerId: ["", [Validators.required]],
      latitude: ["", [Validators.required]],
      longitude: ["", [Validators.required]],
    })
  }

  get f(): { [key: string]: AbstractControl } {
    return this.newFarmForm.controls;
  }

  get b(): { [key: string]: AbstractControl } {
    return this.updateFarmForm.controls;
  }

  async ngOnInit() {
    await this.getAllUsers()
  
    console.log(this.farmDataById.farmOwnerId)
    if (this.mode == constVariable.EDIT) {
      this.updateFarmForm.patchValue({
        farmOwnerId: this.farmDataById.farmOwnerId._id,
        latitude: this.farmDataById.location.coordinates[0],
        longitude: this.farmDataById.location.coordinates[1],
      })
    }
  }

  createFarm() {
    try {
      this.isSubmitted = true
      if (!this.newFarmForm.valid) {
        return;
      }
      const body = {
        farmOwnerId: this.user,
        latitude: this.newFarmForm.value.latitude,
        longitude: this.newFarmForm.value.longitude,
      }

      this.farmService.createFarm(body).subscribe((res: any) => {
        if (res.status == constVariable.SUCCESS) {
          this.toastr.success(message.farm.farmCreated)
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

  updateFarm() {
    try {
      this.isSubmitted = true
      if (!this.updateFarmForm.valid) {
        return;
      }
      const body = {
        latitude: this.updateFarmForm.value.latitude,
        longitude: this.updateFarmForm.value.longitude,
      }
      this.farmService.updateFarm(this.farmDataById._id, body).subscribe((res: any) => {
        if (res.status == constVariable.SUCCESS) {
          this.toastr.success(message.farm.farmUpdated)
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

  async getAllUsers() {
    try {
      await this.usersService.getUser().subscribe((res: any) => {
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

  textchange(event: any) {
    console.log(event.target.value);
    this.user = event.target.value
  }

  backTolisting() {
    this.cancelEvent.emit();
  }
}
