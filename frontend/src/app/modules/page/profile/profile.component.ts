import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from 'src/app/core/http/api/users.service';
import { FormBuilder, FormControl, FormGroup, Validators, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { constVariable } from 'src/environments/const';
import { message } from 'src/environments/en';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  updateProfileForm = new FormGroup({
    email: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    amount  : new FormControl(''),
  })

  constructor(private userService: UsersService, private toastr: ToastrService, private fb: FormBuilder) {
    this.updateProfileForm = this.fb.group({
      email: ["", [Validators.required]],
      firstName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      amount: [""],
    })
  }

  ngOnInit(): void {
    this.getMyDetails();
  }

  getMyDetails() {
    try {
      this.userService.getMe().subscribe((res: any) => {
        if (res.status === constVariable.SUCCESS) {
          let myDetails = res.data.data;

          console.log(myDetails);
          this.updateProfileForm.patchValue({
            email: myDetails.email,
            firstName: myDetails.firstName,
            lastName: myDetails.lastName,
            amount : myDetails.amount,
          })
        } else {
          this.toastr.error(res.error.errors.message);
        }
      })
    } catch (error: any) {
      this.toastr.error(error.message);
    }
  }

  updateProfile() {
    try {
      this.userService.updateMe(this.updateProfileForm.value).subscribe((res: any) => {
        if (res.status === constVariable.SUCCESS) {
          this.toastr.success(message.profile.profileUpdated);
          this.getMyDetails();
        } else {
          this.toastr.error(res.error.errors.message);
        }
      })
    } catch (error: any) {
      this.toastr.error(error.message);
    }
  }

}
