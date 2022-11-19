import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Appointment } from '../store/appointment';

@Injectable({
  providedIn: 'root',
})
export class AppointmentsService {
  constructor(private http: HttpClient) {}

  get() {
    return this.http.get<Appointment[]>('http://localhost:5263/api/Appointments');
  }

  create(payload: Appointment) {
    return this.http.post<Appointment>('http://localhost:5263/api/Appointments', payload);
  }

}