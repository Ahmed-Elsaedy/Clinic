import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { Appstate } from 'src/app/shared/store/appstate';
import { Appointment } from '../../store/appointment';
import { invokeSaveNewAppointmentAPI } from '../../store/appointments.action';
import { ActionsSubject } from '@ngrx/store';
import { setAPIStatus } from 'src/app/shared/store/app.action';

@Component({
  selector: 'app-appointments-create',
  templateUrl: './appointments-create.component.html',
  styleUrls: ['./appointments-create.component.css']
})
export class AppointmentsCreateComponent implements OnInit {
  constructor(
    private store: Store,
    private appStore: Store<Appstate>,
    private router: Router,

  ) { }

  _fg: FormGroup = new FormGroup({
    id: new FormControl(0),
    firstName: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
    lastName: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
    date: new FormControl(null, [Validators.required]),
    phoneNumber: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
    notes: new FormControl(null, [Validators.required, Validators.maxLength(200)])
  });

  apiStatus$ = this.appStore.pipe(select(selectAppState));

  ngOnInit(): void { }

  onSubmit() {
    if (this._fg.valid) {
      this.store.dispatch(invokeSaveNewAppointmentAPI({ newAppointment: this._fg.value }));

      let apiStatus$ = this.appStore.pipe(select(selectAppState));
      apiStatus$.subscribe((apState) => {
        if (apState.apiStatus == 'success') {
          this.appStore.dispatch(
            setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
          );
          this.router.navigate(['/']);
        }
      });
    } else {
      this._fg.markAllAsTouched();
    }
  }
}