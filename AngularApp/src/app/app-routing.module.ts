import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PatientComponent } from './patient/patient.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardDoctorComponent } from './board-doctor/board-doctor.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AboutUsComponent } from "./about-us/about-us.component";

const routes: Routes = [
  { path: 'patient', component: PatientComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent},
  { path: 'user', component: BoardUserComponent },
  // { path: 'user/:id', component: BoardUserComponent },
  { path: 'admin', component: BoardAdminComponent },
  { path: 'doctor', component: BoardDoctorComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
