import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { DashboadComponent } from './dashboad/dashboad.component';
import { RolesComponent } from './roles/roles.component';
import { PermissionComponent } from './permission/permission.component';
import { UserComponent } from './user/user.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import { CropsComponent } from './crops/crops.component';
import { FarmsComponent } from './farms/farms.component';
import { SurveyComponent } from './survey/survey.component';
import { CropTypeComponent } from './crop-type/crop-type.component';
import { CreateSurveyComponent } from './survey/create-survey/create-survey.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { AreaComponent } from './area/area.component';
import { AddEditAreaComponent } from './area/add-edit-area/add-edit-area.component';
import { AddEditCropsComponent } from './crops/add-edit-crops/add-edit-crops.component';
import { AddEditCropTypeComponent } from './crop-type/add-edit-crop-type/add-edit-crop-type.component';
import { AddEditFarmComponent } from './farms/add-edit-farm/add-edit-farm.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddEditRoleComponent } from './roles/add-edit-role/add-edit-role.component';
import { AddEditPermissionComponent } from './permission/add-edit-permission/add-edit-permission.component';
import { AddEditUserComponent } from './user/add-edit-user/add-edit-user.component';
import { DistilleryComponent } from './distillery/distillery.component';
import { AddEditDistilleryComponent } from './distillery/add-edit-distillery/add-edit-distillery.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { AddEditPurchaseComponent } from './purchase/add-edit-purchase/add-edit-purchase.component';
import { NumberComponent } from './number/number.component';
import { AddEditNumberComponent } from './number/add-edit-number/add-edit-number.component';
import { WhatsappComponent } from './whatsapp/whatsapp.component';
import { PaymentComponent } from './payment/payment.component';
import { AddEditPaymentComponent } from './payment/add-edit-payment/add-edit-payment.component';

@NgModule({
  declarations: [
    HomeComponent,
    DashboadComponent,
    RolesComponent,
    PermissionComponent,
    UserComponent,
    ProfileComponent,
    CropsComponent,
    FarmsComponent,
    SurveyComponent,
    CropTypeComponent,
    CreateSurveyComponent,
    AreaComponent,
    AddEditAreaComponent,
    AddEditCropsComponent,
    AddEditCropTypeComponent,
    AddEditFarmComponent,
    AddEditRoleComponent,
    AddEditPermissionComponent,
    AddEditUserComponent,
    DistilleryComponent,
    AddEditDistilleryComponent,
    PurchaseComponent,
    AddEditPurchaseComponent,
    NumberComponent,
    AddEditNumberComponent,
    WhatsappComponent,
    PaymentComponent,
    AddEditPaymentComponent,
    
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    NgbModule
  ]
})
export class PageModule { }
