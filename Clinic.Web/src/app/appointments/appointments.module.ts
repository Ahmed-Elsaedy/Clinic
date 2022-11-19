import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppointmentsRoutingModule } from './appointments-routing.module';
import { AppointmentsIndexComponent } from './views/appointments-index/appointments-index.component';
import { StoreModule } from '@ngrx/store';
import { appointmentReducer } from './store/appointments.reducer';
import { appointmentsFeatureName } from './store/appointments.selector';
import { EffectsModule } from '@ngrx/effects';
import { AppointmentsEffect } from './store/appointments.effect';
import { AppointmentsCreateComponent } from './views/appointments-create/appointments-create.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppointmentsIndexComponent,
    AppointmentsCreateComponent
  ],
  imports: [
    CommonModule,
    AppointmentsRoutingModule,
    StoreModule.forFeature(appointmentsFeatureName, appointmentReducer),
    EffectsModule.forFeature([AppointmentsEffect]),
    ReactiveFormsModule
  ]
})
export class AppointmentsModule { }
