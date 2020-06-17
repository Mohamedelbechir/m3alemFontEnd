import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderAdminComponent } from './header-admin/header-admin.component';
import { FooterComponent } from './footer/footer.component';
import { AuthAdminComponent } from './auth-admin/auth-admin.component';
import { DemandeComponent } from './demande/demande.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { GaleryComponent } from './galery/galery.component';
import { IntroComponent } from './intro/intro.component';
import { DataTablesModule } from 'angular-datatables';
import { AuthAdminGuard } from './guard/auth-admin.guard';
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';
import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component';
import { AvisComponent } from './avis/avis.component';
import { ModalComponent } from './modal/modal/modal.component';
import { AvisListItemComponent } from './avis/avis-list-item/avis-list-item.component';
import { PrixComponent } from './prix/prix.component';
import { DriverComponent } from './driver/driver.component';
import { DriverListItemComponent } from './driver/driver-list-item/driver-list-item.component';
import { HistoriqueCourseComponent } from './historique-course/historique-course.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderAdminComponent,
    FooterComponent,
    AuthAdminComponent,
    DemandeComponent,
    HomeComponent,
    AboutComponent,
    GaleryComponent,
    IntroComponent,
    HomeLayoutComponent,
    LoginLayoutComponent,
    AvisComponent,
    ModalComponent,
    AvisListItemComponent,
    PrixComponent,
    DriverComponent,
    DriverListItemComponent,
    HistoriqueCourseComponent,
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    DataTablesModule,
  ],
  providers: [AuthAdminGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
