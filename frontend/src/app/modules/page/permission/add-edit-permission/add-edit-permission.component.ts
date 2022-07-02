import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { message } from 'src/environments/en';
import { ToastrService } from 'ngx-toastr';
import { constVariable } from 'src/environments/const';
import { PermissionService } from 'src/app/core/http/api/permission.service';
import { RolesService } from 'src/app/core/http/api/roles.service';

@Component({
  selector: 'app-add-edit-permission',
  templateUrl: './add-edit-permission.component.html',
  styleUrls: ['./add-edit-permission.component.css']
})
export class AddEditPermissionComponent implements OnInit {


  @Input() permissionDataById: any;
  @Input() permissionDetails: any
  @Output() cancelEvent = new EventEmitter()
  @Input() mode: any

  newPermissionForm = new FormGroup({
    name: new FormControl(''),
    roleId: new FormControl(''),
    create: new FormControl(''),
    read: new FormControl(''),
    update: new FormControl(''),
    delete: new FormControl('')
  })

  updatePermissionForm = new FormGroup({
    name: new FormControl(''),
    roleId: new FormControl(''),
    create: new FormControl(''),
    read: new FormControl(''),
    update: new FormControl(''),
    delete: new FormControl('')
  })
  roleData: any;
  role: any;
  isSubmitted = false;

  nameRequired = message.role.nameRequired;
  roleRequired = message.role.roleRequired;

  constructor(private fb: FormBuilder, private toastr: ToastrService, private permissionService: PermissionService, private rolesService: RolesService) {
    this.newPermissionForm = this.fb.group({
      name: ["", [Validators.required]],
      roleId: ["", [Validators.required]],
      create: [false, [Validators.required]],
      read: [false, [Validators.required]],
      update: [false, [Validators.required]],
      delete: [false, [Validators.required]],
    })

    this.updatePermissionForm = this.fb.group({
      name: ["", [Validators.required]],
      roleId: ["", [Validators.required]],
      create: ["", [Validators.required]],
      read: ["", [Validators.required]],
      update: ["", [Validators.required]],
      delete: ["", [Validators.required]],
    })
  }

  get f(): { [key: string]: AbstractControl } {
    return this.newPermissionForm.controls;
  }


  get b(): { [key: string]: AbstractControl } {
    return this.updatePermissionForm.controls;
  }


  async ngOnInit() {
    await this.getRoles()

    // this.updatePermissionForm.patchValue({
    //   name: name.name,
    //   roleId: permission.roleId,
    //   roles_name: permission.roles_name,
    //   create: permission.create,
    //   read: permission.read,
    //   update: permission.update,
    //   delete: permission.delete,
    // })

    if (this.mode == constVariable.EDIT) {
      this.updatePermissionForm.patchValue({
        name: this.permissionDataById.name,
        roleId: this.permissionDetails.roleId,
        roles_name: this.permissionDetails.roles_name,
        create: this.permissionDetails.create,
        read: this.permissionDetails.read,
        update: this.permissionDetails.update,
        delete: this.permissionDetails.delete,
      })
    }
  }

  createPermission() {
    try {
      this.isSubmitted = true
      console.log(this.newPermissionForm)
      if (!this.newPermissionForm.valid) {
        return;
      }
      let role1 = this.roleData.find((i: { _id: any; }) => i._id.toString() === this.newPermissionForm.value.roleId.toString())
      console.log(role1)
      if (role1 == undefined) {
        this.toastr.error(this.roleRequired)
      }
      const body = {
        name: this.newPermissionForm.value.name,
        resources_roles: [{
          roleId: this.role,
          roles_name: role1.name,
          create: this.newPermissionForm.value.create,
          read: this.newPermissionForm.value.read,
          update: this.newPermissionForm.value.update,
          delete: this.newPermissionForm.value.delete,
        }]
      };

      this.permissionService.createPermission(body).subscribe((res: any) => {
        if (res.status == constVariable.SUCCESS) {
          this.backTolisting()
          this.toastr.success(message.permission.permissionCreated);
        } else {
          this.toastr.error(res.error.errors.message);
        }
      })
    } catch (error: any) {
      this.toastr.error(error.message);
    }
  }

  updatePermission() {
    try {
      const body = {
        roleId: this.updatePermissionForm.value.roleId,
        create: this.updatePermissionForm.value.create,
        read: this.updatePermissionForm.value.read,
        update: this.updatePermissionForm.value.update,
        delete: this.updatePermissionForm.value.delete,
      };
      this.permissionService.updatePermission(this.permissionDataById._id, body).subscribe((res: any) => {
        if (res.status == constVariable.SUCCESS) {
          this.backTolisting()
          this.toastr.success(message.permission.permissionUpdated);
        } else {
          this.toastr.error(res.error.errors.message);
        }
      })
    } catch (error: any) {
      this.toastr.error(error.message);
    }
  }

  async getRoles() {
    try {
      await this.rolesService.getRoles().subscribe((res: any) => {
        const allRoleData = res.data.data;
        this.roleData = allRoleData.filter(function (role: any) {
          return role['active'] == true;
        })
      })
    } catch (error: any) {
      this.toastr.error(error.message)
    }
  }

  textchange(event: any) {
    this.role = event.target.value;
    console.log(this.role)
  }

  backTolisting() {
    this.cancelEvent.emit();
  }

}
