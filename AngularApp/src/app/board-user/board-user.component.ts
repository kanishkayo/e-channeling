import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';
import { Doctor } from '../_services/doctor.model';
import { Service } from '../_services/service.model';
import { DoctorHasService } from '../_services/doctorHasService.model';
import { DoctorServiceCenter } from '../_services/doctorServiceCenter.model';
import {Customer, CurrencyType,PayhereCheckout, CheckoutParams} from 'payhere-js-sdk';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { WebSocketService } from '../web-socket.service';

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css']
})
export class BoardUserComponent implements OnInit {

  userDetails : any;
  allAppointments : any;
  showDoctorSelectArea = false;
  showDoctorCenterSelectArea = false;
  formAppointment: any = {
    service: null,
    doctor: null,
    center:null,
    aDate:null,
  }
  appointmentId :string;

  constructor(public userService: UserService, private tokenStorage: TokenStorageService, private authService: AuthService, public route: ActivatedRoute, public router: Router, private webSocketService: WebSocketService) { }

  ngOnInit(): void {
    this.userDetails = this.tokenStorage.getUser();
    this.webSocketService.listen('change-doctor-approval-appointment').subscribe((data) => this.getAppointments());
    this.getAllServices();
    this.getAppointments();

    // this.id = this.route.url;
    
    this.route.queryParams
      .subscribe(params => {
        console.log(params); // { order_id: "patient Id" }
        this.appointmentId = params['order_id'];
        if (this.appointmentId) {
          // this.markPaymentDone();
        }
      }
    );
  }

  clickMyButton(): void {
    this.webSocketService.emit('add-appointment', "sample");
  }

  onSubmitSaveAppointment(): void {

    const { service, doctor, center, aDate } = this.formAppointment;
    
    this.authService.registerDoctorAppointment(service, doctor, center, aDate, this.userDetails.id).subscribe(
      data => {
        this.webSocketService.emit('add-appointment', "sample");
        console.log(data);
        this.clearAppointmentForm();
        this.getDoctorCenters();
        
      },
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

  getDoctors(): void {
    const { service } = this.formAppointment;
    this.showDoctorSelectArea = true;
    console.log(service);
    this.authService.getAllDoctorsAccService(service).subscribe(
      data => {
        console.log(data);
        let arrayOfService = data.data;
        var arrayDoctor : any = [] ;
        arrayOfService.forEach((element: any) => {
          arrayDoctor.push({
            _id: element.doctor._id,
            name: "Dr."+ element.doctor.name + " ("+ element.doctor.specialization+")",
          })
        });
        this.userService.doctorsList = arrayDoctor;
      },
    );
  }

  getDoctorCenters(): void {
    const { doctor } = this.formAppointment;
    this.showDoctorCenterSelectArea = true;
    console.log(doctor);
    this.authService.getAllCentersAccDoctor(doctor).subscribe(
      data => {
        console.log(data);
        let arrayOfServiceCenters = data.data;
        var arrayCenters : any = [] ;
        arrayOfServiceCenters.forEach((element: any) => {
          arrayCenters.push({
            _id: element._id,
            name: element.name + " ("+ element.location+")",
          })
        });
        this.userService.doctorServiceCenterList = arrayCenters;
      },
    );
  }

  clearAppointmentForm():void {
    window.location.reload();
  }

  getAppointments():void {
    
    this.authService.getAllAppointmentsAccPatient(this.userDetails.id).subscribe(
      data => {
        console.log(data);
        this.allAppointments = data.data;
      },
    );
  }

  checkout(appointment: any):void {
    try {
      const customer = new Customer({
        first_name: appointment.patient.username,
        last_name: "Lakshan",
        phone: "+94771234567",
        email: appointment.patient.email,
        address: "No. 50, Highlevel Road",
        city: "Panadura",
        country: "Sri Lanka",
      });

      const checkoutData = new CheckoutParams({
        returnUrl: "http://localhost:4200/user",
        cancelUrl: 'http://localhost:4200/user',
        notifyUrl: 'http://localhost:4200/user',
        order_id: appointment._id,
        itemTitle: appointment.service.serviceName,
        currency: CurrencyType.LKR,
        platform:"",
        custom1:"",
        custom2:"",
        amount: parseFloat(appointment.service.serviceCharges),
        hash:"098F6BCD4621D373CADE4E832627B4F6",
      });
    
      const checkout = new PayhereCheckout(customer,checkoutData)
      checkout.start()
    }
    catch(err){
      console.log(err)
    }
  }

  markPaymentDone(appointmentId: string):void {
    this.authService.markPaymentDone(this.userDetails.id, appointmentId).subscribe(
      data => {
        console.log(data);
        this.webSocketService.emit('paid-service-charge', "sample");
        this.router.navigate(['user']);
        this.getAllServices();
        this.getAppointments();
        window.location.reload();
      },
    );
  }
}
