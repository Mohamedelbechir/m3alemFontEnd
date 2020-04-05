import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DemandeComponent } from './demande/demande.component';
import { AuthAdminComponent } from './auth-admin/auth-admin.component';
import { HomeComponent } from './home/home.component';
import { AuthAdminGuard } from './guard/auth-admin.guard';



const routes: Routes = [
  {path:'', component: AuthAdminComponent},
  {path:'login', component: AuthAdminComponent},
  {path:'home', component: HomeComponent, canActivate: [AuthAdminGuard]},
  {path:'demande', component: DemandeComponent,canActivate: [AuthAdminGuard]},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
