import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { invokeFetchAppointmentsAPI } from '../../store/appointments.action';
import { selectAppointments } from '../../store/appointments.selector';

@Component({
  selector: 'app-appointments-index',
  templateUrl: './appointments-index.component.html',
  styleUrls: ['./appointments-index.component.css']
})
export class AppointmentsIndexComponent implements OnInit {

  constructor(private store: Store) { }

  appointments$ = this.store.pipe(select(selectAppointments));

  ngOnInit(): void {
    this.store.dispatch(invokeFetchAppointmentsAPI());
  }
}