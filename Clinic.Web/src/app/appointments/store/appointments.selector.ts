import { createFeatureSelector } from '@ngrx/store';
import { Appointment } from './appointment';

export const appointmentsFeatureName : string = 'appointments';

export const selectAppointments = createFeatureSelector<Appointment[]>(appointmentsFeatureName);