import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/auth/auth.guard'


const loginModule = import('../app/modules/login/login.module').then(m => m.LoginModule);
const adminModule = import('../app/routes/admin/admin.module').then(m => m.AdminModule);
const userModule = import('../app/routes/user/user.module').then(m => m.UserModule);
const superAdminModule = import('../app/routes/super-admin/super-admin.module').then(m => m.SuperAdminModule);
const signupModule = import('../app/modules/signup/signup.module').then(m => m.SignupModule)

const routes: Routes = [
  { path: '', redirectTo: 'user/login', pathMatch: 'full' },
  { path: 'admin', canActivate: [AuthGuard], loadChildren: () => adminModule },
  { path: 'admin/login', loadChildren: () => loginModule },
  { path: 'user', canActivate: [AuthGuard], loadChildren: () => userModule },
  { path: 'user/login', loadChildren: () => loginModule },
  { path: 'superAdmin', canActivate: [AuthGuard], loadChildren: () => superAdminModule },
  { path: 'superAdmin/login', loadChildren: () => loginModule },
  { path: 'signUp' , loadChildren: () => signupModule},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
