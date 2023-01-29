import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';
import { Doctor } from '../_services/doctor.model';
import { Service } from '../_services/service.model';
import { DoctorHasService } from '../_services/doctorHasService.model';
import { DoctorServiceCenter } from '../_services/doctorServiceCenter.model';

// import * as io from 'socket.io-client';
// import { io } from "socket.io-client";
import { WebSocketService } from '../web-socket.service';



@Component({
  selector: 'app-board-doctor',
  templateUrl: './board-doctor.component.html',
  styleUrls: ['./board-doctor.component.css']
})
export class BoardDoctorComponent implements OnInit {

  // socket = io('http://localhost:3000');
  doctorDetails : any;
  allAppointments : any;
  formService: any = {
    service: null,
  }
  formServiceCenter: any = {
    serviceCenterName: null,
    serviceCenterLocation: null,
  }
  formAppointmentAction: any = {
    appointmentAction: null,
  }

  constructor(public userService: UserService, private tokenStorage: TokenStorageService, private authService: AuthService, private webSocketService: WebSocketService) { }

  ngOnInit(): void {
    this.doctorDetails = this.tokenStorage.getUser();
    this.webSocketService.listen('add-appointment').subscribe((data) => this.getAppointments());
    this.webSocketService.listen('paid-service-charge').subscribe((data) => this.getAppointments());
    console.log('DOCTOR___', this.doctorDetails);
    this.getAllServices();
    this.getAllDoctorHasServices();
    this.getAllDoctorServiceCenters();
    this.getAppointments();
    

    // this.socket.on('appointments-data', (data: any) => {
    //   this.getAppointments();
    // });
  }

  getAllServices():void {
    this.authService.getAllServices().subscribe(
      data => {
        console.log(data);
        this.userService.serviceList = data.data as Service[];
      },
    );
  }

  onSubmitSaveService(): void {

    const { service } = this.formService;
    
    this.authService.registerDoctorHasServices(service, this.doctorDetails.id).subscribe(
      data => {
        console.log(data);
        document.getElementById('closeServiceModel')?.click();
        this.getAllDoctorHasServices();
      },
    );
  }

  onSubmitSaveServiceCenter(): void {

    const { serviceCenterName, serviceCenterLocation } = this.formServiceCenter;
    
    this.authService.registerDoctorServiceCenters(serviceCenterName, serviceCenterLocation, this.doctorDetails.id).subscribe(
      data => {
        console.log(data);
        document.getElementById('closeServiceCenterModel')?.click();
        this.getAllDoctorServiceCenters();
      },
    );
  }

  getAllDoctorHasServices():void {
    this.authService.getAllDoctorHasServices(this.doctorDetails.id).subscribe(
      data => {
        console.log(data);
        this.userService.doctorHasServiceList = data.data as DoctorHasService[];
      },
    );
  }

  getAllDoctorServiceCenters():void {
    this.authService.getAllDoctorServiceCenter(this.doctorDetails.id).subscribe(
      data => {
        console.log(data);
        this.userService.doctorServiceCenterList = data.data as DoctorServiceCenter[];
      },
    );
  }

  deleteDoctorService(deleteServiceId: string):void {

    if (confirm('Are you sure to delete this service?') == true) {
      this.authService.deleteDoctorHasServices(deleteServiceId).subscribe(
        data => {
          this.getAllDoctorHasServices();
        },
      );
    }
  }

  deleteDoctorServiceCenter(deleteServiceId: string):void {

    if (confirm('Are you sure to delete this service center?') == true) {
      this.authService.deleteDoctorServiceCenter(deleteServiceId).subscribe(
        data => {
          this.getAllDoctorServiceCenters();
        },
      );
    }
  }

  getAppointments():void {
    
    this.authService.getAllAppointmentsAccDoctor(this.doctorDetails.id).subscribe(
      data => {
        console.log(data);
        this.allAppointments = data.data;
      },
    );
  }

  onSubmitSaveDoctorActionInAppointment(appointmentId:string, index: number, patientEmail: string): void {
    
     const { appointmentAction } = this.formAppointmentAction;
     this.authService.acceptDoctorAppointment(appointmentAction, appointmentId, patientEmail).subscribe(
      data => {
        console.log(data);
        this.webSocketService.emit('change-doctor-approval-appointment', "sample");
        document.getElementById('closeAppointmentActionModel'+index)?.click();
        this.getAppointments();
      },
    );
  }
}
