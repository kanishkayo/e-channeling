import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';

import { AuthService } from '../_services/auth.service';
import { Doctor } from '../_services/doctor.model';
import { Service } from '../_services/service.model';

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css'],
  providers: [UserService]
})
export class BoardAdminComponent implements OnInit {
  content?: string;
  isLoggedIn = false;
  allAppointments : any;
  formDoctor: any = {
    id: null,
    name: null,
    email: null,
    mobile: null,
    nic:null,
    roles: 'doctor',
    status: 'available',
    eduQualification:null,
    specialization:null,
  };
  formService: any = {
    id: null,
    serviceName: null,
    serviceDescription:null,
    serviceCharges:null,
  }
  roles = 'doctor';
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(public userService: UserService, private tokenStorage: TokenStorageService, private authService: AuthService) { }

  ngOnInit(): void {
    this.userService.getAdminBoard().subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }

    this.getAllDoctors();
    this.getAllServices();
    this.getAppointments();
  }

  onSubmitRegisterDoctor(): void {

    const { name, email, mobile, nic, eduQualification, specialization, roles, status } = this.formDoctor;
    
    this.authService.registerDoctor(name, email, mobile, nic, eduQualification, specialization, roles, status).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        document.getElementById('closeDoctorModel')?.click();
        this.getAllDoctors();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }

  getAllDoctors():void {
    this.authService.getAllDoctors(this.roles).subscribe(
      data => {
        console.log(data);
        this.userService.doctorsList = data.data as Doctor[];
      },
    );
  }

  onSubmitRegisterService(): void {

    const { serviceName, serviceDescription, serviceCharges } = this.formService;
    
    this.authService.registerServices(serviceName, serviceDescription, serviceCharges).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        document.getElementById('closeServiceModel')?.click();
        this.getAllServices();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }

  getAllServices():void {
    this.authService.getAllServices().subscribe(
      data => {
        console.log(data);
        this.userService.serviceList = data.data as Service[];
      },
    );
  }

  getAppointments():void {
    
    this.authService.getAllAppointments().subscribe(
      data => {
        console.log(data);
        this.allAppointments = data.data;
      },
    );
  }

  onSubmitUpdateDoctor(index:number): void {
    const { id, name, mobile, nic, eduQualification, specialization, roles, status } = this.formDoctor;
    
    this.authService.updateDoctor(id, name, mobile, nic, eduQualification, specialization, roles, status).subscribe(
      data => {
        console.log(data);
        document.getElementById('closeDoctorUpdateModel'+index)?.click();
        this.getAllDoctors();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }

  onSubmitUpdateService(index:number): void {
    const { id, serviceName, serviceDescription, serviceCharges } = this.formService;

    this.authService.updateService(id, serviceName, serviceDescription, serviceCharges).subscribe(
      data => {
        console.log(data);
        document.getElementById('closeServiceModel'+index)?.click();
        this.getAllServices();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }

  parseDataForEditForm(doctor:any): void{
    this.formDoctor.id = doctor._id;
    this.formDoctor.name = doctor.name;
    this.formDoctor.email = doctor.email;
    this.formDoctor.mobile = doctor.mobile;
    this.formDoctor.nic = doctor.nic;
    this.formDoctor.eduQualification = doctor.eduQualification;
    this.formDoctor.specialization = doctor.specialization;
  }

  parseDataForServiceEditForm(service:any): void{
    this.formService.id = service._id;
    this.formService.serviceName = service.serviceName;
    this.formService.serviceDescription = service.serviceDescription;
    this.formService.serviceCharges = service.serviceCharges;
  }
}
