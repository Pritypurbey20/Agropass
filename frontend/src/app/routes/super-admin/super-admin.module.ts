import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared-modules';
import { SuperAdminRoutingModule } from './super-admin-routing.module';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SuperAdminRoutingModule,
    SharedModule
  ]
})
export class SuperAdminModule { }
