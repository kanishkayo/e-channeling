import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:3000/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      email,
      password
    }, httpOptions);
  }

  register(username: string, email: string, password: string,address: string, mobile: string): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      username,
      email,
      address,
      mobile,
      password
    }, httpOptions);
  }

  registerDoctor(name: string, email: string, mobile: string, nic: string, eduQualification:string,specialization:string, roles:string, status:string ): Observable<any> {
    return this.http.post(AUTH_API + 'registerDoctor', {
      name,
      email,
      mobile,
      nic,
      roles,
      status,
      eduQualification,
      specialization
    }, httpOptions);
  }

  updateDoctor(id: string, name: string,mobile: string, nic: string, eduQualification:string,specialization:string, roles:string, status:string ): Observable<any> {
    return this.http.post(AUTH_API + 'updateDoctor', {
      id,
      name,
      mobile,
      nic,
      eduQualification,
      specialization
    }, httpOptions);
  }

  registerServices(serviceName: string, serviceDescription: string, serviceCharges: string): Observable<any> {
    return this.http.post(AUTH_API + 'registerService', {
      serviceName,
      serviceDescription,
      serviceCharges,
    }, httpOptions);
  }

  updateService(id: string, serviceName: string, serviceDescription: string, serviceCharges: string): Observable<any> {
    return this.http.post(AUTH_API + 'updateService', {
      id,
      serviceName,
      serviceDescription,
      serviceCharges,
    }, httpOptions);
  }

  registerDoctorHasServices(service: string, doctorId: string): Observable<any> {
    return this.http.post(AUTH_API + 'registerDoctorHasService', {
      service,
      doctorId
    }, httpOptions);
  }

  registerDoctorServiceCenters(serviceCenterName: string, serviceCenterLocation: string, doctorId: string): Observable<any> {
    return this.http.post(AUTH_API + 'registerDoctorServiceCenters', {
      serviceCenterName,
      serviceCenterLocation,
      doctorId,
    }, httpOptions);
  }

  registerDoctorAppointment(service:string, doctor:string, center:string, aDate:string, patient: string): Observable<any> {
    return this.http.post(AUTH_API + 'registerDoctorAppointment', {
      service,
      doctor,
      center,
      aDate,
      patient
    }, httpOptions);
  }

  getAllDoctors(roles:string): Observable<any> {
    return this.http.post(AUTH_API + 'getDoctors', {
      roles,
    }, httpOptions);
  }

  getAllServices(): Observable<any> {
    return this.http.post(AUTH_API + 'getServices', httpOptions);
  }

  getAllDoctorHasServices(doctor:string): Observable<any> {
    return this.http.post(AUTH_API + 'getDoctorHasServiceList', {
      doctor,
    }, httpOptions);
  }

  getAllDoctorServiceCenter(doctor:string): Observable<any> {
    return this.http.post(AUTH_API + 'getDoctorServiceCenterList', {
      doctor,
    }, httpOptions);
  }

  deleteDoctorHasServices(deleteId:string): Observable<any> {
    return this.http.post(AUTH_API + 'deleteDoctorHasServices', {
      deleteId,
    }, httpOptions);
  }

  deleteDoctorServiceCenter(deleteId:string): Observable<any> {
    return this.http.post(AUTH_API + 'deleteDoctorServiceCenter', {
      deleteId,
    }, httpOptions);
  }

  getAllDoctorsAccService(service:string): Observable<any> {
    return this.http.post(AUTH_API + 'getAllDoctorsAccService', {
      service,
    }, httpOptions);
  }

  getAllCentersAccDoctor(doctor:string): Observable<any> {
    return this.http.post(AUTH_API + 'getAllCentersAccDoctor', {
      doctor,
    }, httpOptions);
  }

  getAllAppointmentsAccPatient(patient:string): Observable<any> {
    return this.http.post(AUTH_API + 'getAllAppointmentsAccPatient', {
      patient,
    }, httpOptions);
  }

  markPaymentDone(patientId:string, appointmentId: string): Observable<any> {
    return this.http.post(AUTH_API + 'markPaymentDone', {
      patientId,
      appointmentId,
    }, httpOptions);
  }

  getAllAppointmentsAccDoctor(doctor:string): Observable<any> {
    return this.http.post(AUTH_API + 'getAllAppointmentsAccDoctor', {
      doctor,
    }, httpOptions);
  }

  getAllAppointments(): Observable<any> {
    return this.http.post(AUTH_API + 'getAllAppointments', {
    }, httpOptions);
  }

  acceptDoctorAppointment(appointmentAction:string, appointmentId: string, patientEmail:string): Observable<any> {
    return this.http.post(AUTH_API + 'acceptDoctorAppointment', {
      appointmentAction,
      appointmentId,
      patientEmail,
    }, httpOptions);
  }
}
