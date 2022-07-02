import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { UsersService } from 'src/app/core/http/api/users.service';
import { regex } from 'src/environments/regex';
import { message } from 'src/environments/en';
import { ToastrService } from 'ngx-toastr';
import {constVariable} from 'src/environments/const';
import {RolesService} from 'src/app/core/http/api/roles.service';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.css']
})
export class AddEditUserComponent implements OnInit {

  @Input() userDataByID: any;
  @Output() cancelEvent = new EventEmitter()
  @Input() mode: any

  newUserForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    passwordConfirm: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    roleId: new FormControl(''),
  })


  updateUserForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    roleId: new FormControl(''),
  })

  isSubmitted: boolean = false
  emailPattern = regex.emailPattern;
  emailRequired = message.login.emailRequired
  invalidEmail = message.login.invalidEmail
  passwordRequired = message.login.passwordRequired
  passwordValidate = message.login.passwordValidate
  nameRequired = message.signup.nameRequired
  confirmPasswordRequired = message.signup.confirmPasswordRequired
  passwordNotSame = message.signup.passwordNotSame
  firstNameRequired = message.signup.firstNameRequired
  lastNameRequired = message.signup.lastNameRequired
  roleRequired = message.role.roleRequired
  role: any;
  roleId: any;
  roleData: Array<any> = [];

  constructor(private usersService: UsersService, private fb: FormBuilder, private toastr: ToastrService , private rolesService: RolesService) { 
    this.newUserForm = this.fb.group({
      name: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.pattern(this.emailPattern)]],
      password: ["", [Validators.required, Validators.minLength(8)]],
      passwordConfirm: ["", [Validators.required, Validators.minLength(8)]],
      firstName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      roleId: ["", [Validators.required]],
    })

    this.updateUserForm = this.fb.group({
      email: ["", [Validators.required, Validators.pattern(this.emailPattern)]],
      firstName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      roleId: ["", [Validators.required]],
    })
  }

  get f(): { [key: string]: AbstractControl } {
    return this.newUserForm.controls;
  }

  get b(): { [key: string]: AbstractControl } {
    return this.updateUserForm.controls;
  }

  ngOnInit(): void {
    this.getRoles()
    if(this.mode == 'edit'){
      this.updateUserForm.patchValue({
        email: this.userDataByID.email,
        firstName: this.userDataByID.firstName,
        lastName: this.userDataByID.lastName,
        roleId: this.userDataByID.roleId
      })
    }
  }

  createUser() {
    try {
      this.isSubmitted = true
      if (!this.newUserForm.valid) {
        return;
      }
      const body = {
        name: this.newUserForm.value.name,
        email: this.newUserForm.value.email,
        password: this.newUserForm.value.password,
        passwordConfirm: this.newUserForm.value.passwordConfirm,
        firstName: this.newUserForm.value.firstName,
        lastName: this.newUserForm.value.lastName,
        roleId: this.roleId
      };

      console.log(body)
      this.usersService.createUser(body).subscribe((res: any) => {
        if (res.status == constVariable.SUCCESS) {
          this.toastr.success(message.user.userCreated)
          this.backTolisting()
        } else {
          this.backTolisting()
          this.toastr.error(res.error.errors.message)
        }
      })
    } catch (error: any) {
      this.toastr.error(error.message);
      return;
    }
  }

  updateUser() {
    try {
      this.isSubmitted = true
      if (!this.updateUserForm.valid) {
        return;
      }
      const body = {
        email: this.updateUserForm.value.email,
        firstName: this.updateUserForm.value.firstName,
        lastName: this.updateUserForm.value.lastName,
        roleId: this.roleId
      };

      this.usersService.updateUser(this.userDataByID._id, body).subscribe((res: any) => {
        if (res.status == constVariable.SUCCESS) {
          this.toastr.success(message.user.userUpdated)
          this.backTolisting()
        } else {
          this.backTolisting()
          this.toastr.error(res.error.errors.message)
        }
      })
    } catch (error: any) {
      this.toastr.error(error.message);
      return;
    }

  }

  getRoles() {
    try {
      this.rolesService.getRoles().subscribe((res: any) => {
        if (res.status == constVariable.SUCCESS) {
          const allRoleData = res.data.data;
          this.roleData = allRoleData.filter(function (role: any) {
            return role['active'] == true;
          })
          this.roleId = this.roleData[0]._id;
        } else {
          this.toastr.error(res.error.errors.message);
        }
      })
    } catch (error: any) {
      this.toastr.error(error.message);
      return;
    }
  }

  textchange(event: any) {
    console.log(event.target.value);
    this.role = event.target.value
  }

  backTolisting() {
    this.cancelEvent.emit();
  }


}
