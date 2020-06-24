import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DemandeComponent } from './demande/demande.component';
import { AuthAdminComponent } from './auth-admin/auth-admin.component';
import { HomeComponent } from './home/home.component';
import { AuthAdminGuard } from './guard/auth-admin.guard';
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';
import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component';
import { AvisComponent } from './avis/avis.component';
import { PrixComponent } from './prix/prix.component';
import { DriverComponent } from './driver/driver.component';
import { PassagerComponent } from './passager/passager.component';



const routes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
    canActivate: [AuthAdminGuard],
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'demande', component: DemandeComponent
      },
      {
        path: 'drivers', component: DriverComponent
      },
      {
        path: 'passagers', component: PassagerComponent
      },
      {
        path: 'avis', component: AvisComponent
      },
      {
        path: 'prix', component: PrixComponent
      },
    ]
  },
  {
    path: '',
    component: LoginLayoutComponent,
    children: [
      {
        path: 'login',
        component: AuthAdminComponent
      }
    ]
  },

  /*{ path: '', component: AuthAdminComponent },
  { path: 'login', component: AuthAdminComponent },*/
  //{ path: 'home', component: HomeComponent, canActivate: [AuthAdminGuard] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
