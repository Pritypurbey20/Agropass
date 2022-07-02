import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../../modules/theme/components/layout/layout.component';
import { HomeComponent } from '../../modules/page/home/home.component';
import { DashboadComponent } from '../../modules/page/dashboad/dashboad.component';

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
        
    ]
}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperAdminRoutingModule { }
