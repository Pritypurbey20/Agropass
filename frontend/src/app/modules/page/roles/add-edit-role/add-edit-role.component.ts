import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { message } from 'src/environments/en';
import { constVariable } from 'src/environments/const';
import { RolesService } from 'src/app/core/http/api/roles.service';

@Component({
  selector: 'app-add-edit-role',
  templateUrl: './add-edit-role.component.html',
  styleUrls: ['./add-edit-role.component.css']
})
export class AddEditRoleComponent implements OnInit {

  @Input() roleDataById: any;
  @Output() cancelEvent = new EventEmitter()
  @Input() mode: any

  newRoleForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    slug: new FormControl(''),
  });
  updateRoleForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    slug: new FormControl(''),
  });
  isSubmitted: boolean = false;
  nameRequired = message.role.nameRequired;
  slugRequired = message.role.slugRequired;


  constructor(private fb: FormBuilder, private toastr: ToastrService, private rolesService: RolesService) {
    this.newRoleForm = this.fb.group({
      name: ["", [Validators.required]],
      slug: ["", [Validators.required]],
    })

    this.updateRoleForm = this.fb.group({
      name: ["", [Validators.required]],
      slug: ["", [Validators.required]],
    })
  }


  get f(): { [key: string]: AbstractControl } {
    return this.newRoleForm.controls;
  }

  get b(): { [key: string]: AbstractControl } {
    return this.updateRoleForm.controls;
  }

  ngOnInit(): void {
    if (this.mode == constVariable.EDIT) {
      this.updateRoleForm.patchValue({
        name: this.roleDataById.name,
        slug: this.roleDataById.slug,
      })
    }
  }

  createRole() {
    try {
      this.isSubmitted = true
      if (!this.newRoleForm.valid) {
        return;
      }
      const body = {
        name: this.newRoleForm.value.name,
        slug: this.newRoleForm.value.slug,
      };
      console.log(body);
      this.rolesService.createRole(body).subscribe((res: any) => {
        console.log(res);
        if (res.status == constVariable.SUCCESS) {
          this.toastr.success(message.role.roleCreated);

          this.backTolisting();
        } else {
          this.toastr.error(res.error.errors.message);
        }
      })
    } catch (error: any) {
      this.toastr.error(error.message);
      return;
    }
  }

  updateRole() {
    try {
      this.isSubmitted = true
      if (!this.updateRoleForm.valid) {
        return;
      }
      const body = {
        name: this.updateRoleForm.value.name,
        slug: this.updateRoleForm.value.slug,
      };
      this.rolesService.updateRole(this.roleDataById._id, body).subscribe((res: any) => {
        if (res.status == constVariable.SUCCESS) {

          this.toastr.success(message.role.roleUpdated);
          this.backTolisting();
        } else {

          this.toastr.error(res.error.errors.message);
        }
      })
    } catch (error: any) {

      this.toastr.error(error.message);
      return;
    }
  }

  backTolisting() {
    this.cancelEvent.emit();
  }


}
