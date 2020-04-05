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
