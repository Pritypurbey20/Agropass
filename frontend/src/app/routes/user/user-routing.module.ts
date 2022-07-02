import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../../modules/theme/components/layout/layout.component';
import { HomeComponent } from '../../modules/page/home/home.component';
import { DashboadComponent } from '../../modules/page/dashboad/dashboad.component';
import { RolesComponent } from 'src/app/modules/page/roles/roles.component';
import { PermissionComponent } from 'src/app/modules/page/permission/permission.component';
import { UserComponent } from 'src/app/modules/page/user/user.component';
import { ProfileComponent } from 'src/app/modules/page/profile/profile.component';
import { CropsComponent } from 'src/app/modules/page/crops/crops.component';
import { FarmsComponent } from 'src/app/modules/page/farms/farms.component';
import { SurveyComponent } from 'src/app/modules/page/survey/survey.component';
import { CropTypeComponent } from 'src/app/modules/page/crop-type/crop-type.component';
import { AreaComponent } from 'src/app/modules/page/area/area.component';
import { DistilleryComponent } from 'src/app/modules/page/distillery/distillery.component';
import { PurchaseComponent } from 'src/app/modules/page/purchase/purchase.component';
import { NumberComponent } from 'src/app/modules/page/number/number.component';
import { WhatsappComponent } from 'src/app/modules/page/whatsapp/whatsapp.component';
import { PaymentComponent } from 'src/app/modules/page/payment/payment.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'dashboard',
        component: DashboadComponent,
      },
      {
        path: 'roles',
        component: RolesComponent
      },
      {
        path: 'permissions',
        component: PermissionComponent,
      },
      {
        path: 'user',
        component: UserComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'crops',
        component : CropsComponent
      },
      {
        path : 'farms',
        component : FarmsComponent
      },
      {
        path : 'surveys',
        component : SurveyComponent
      },
      {
        path: 'cropType',
        component: CropTypeComponent
      },
      {
        path: 'area',
        component: AreaComponent
      },
      {
        path : 'distillery',
        component : DistilleryComponent
      },
      {
        path : 'purchase',
        component : PurchaseComponent
      },
      {
        path : "number",
        component : NumberComponent
      },
      {
        path : 'whatsapp',
        component : WhatsappComponent
      },
      {
        path : 'payment',
        component : PaymentComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
