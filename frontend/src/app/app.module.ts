import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { JobTileComponent } from './components/job-tile/job-tile.component';
import { FilterBoxComponent } from './components/filter-box/filter-box.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { LoginComponent } from './pages/login/login.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AdminLoginComponent } from './pages/admin-login/admin-login.component';
import { MoreDetialsComponent } from './pages/more-detials/more-detials.component';
import { StatusTileComponent } from './components/status-tile/status-tile.component';
import { StatusComponent } from './pages/status/status.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { AdminJobDetialsComponent } from './pages/admin-job-detials/admin-job-detials.component';
import { ViewApplicantsComponent } from './pages/view-applicants/view-applicants.component';
import { PostJobComponent } from './pages/post-job/post-job.component';
import { HttpClientModule } from '@angular/common/http';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { authInterceptor } from './interceptors/auth.interceptor';

import { ToastrModule } from 'ngx-toastr';
import { LoadingComponent } from './pages/loading/loading.component';
import { loadingInterceptor } from './interceptors/loading.interceptor';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    JobTileComponent,
    FilterBoxComponent,
    LoginFormComponent, 
    LoginComponent,
    AdminLoginComponent,
    MoreDetialsComponent,
    StatusTileComponent,
    StatusComponent,
    AdminDashboardComponent,
    AdminJobDetialsComponent,
    ViewApplicantsComponent,
    PostJobComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      maxOpened:1
    })
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    { provide: HTTP_INTERCEPTORS, useClass: authInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: loadingInterceptor, multi: true }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
