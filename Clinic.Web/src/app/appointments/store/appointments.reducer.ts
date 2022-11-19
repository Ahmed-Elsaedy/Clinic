import { createReducer, on } from "@ngrx/store";
import { Appointment } from './appointment';
import { fetchAppointmentsAPISuccess, saveNewAppointmentAPISucess } from "./appointments.action";

export const initialState: ReadonlyArray<Appointment> = [];

export const appointmentReducer = createReducer(
    initialState,
    on(fetchAppointmentsAPISuccess, (state, { allAppointments }) => {
        return allAppointments;
    }),
    on(saveNewAppointmentAPISucess, (state, { newAppointment }) => {
        let newState = [...state];
        newState.unshift(newAppointment);
        return newState;
    })
);