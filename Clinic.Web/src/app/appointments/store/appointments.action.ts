import { createAction, props } from "@ngrx/store";
import { Appointment } from "./appointment";


export const invokeFetchAppointmentsAPI = createAction(
    '[Appointment API] Invoke Fetch Appointments API'
);

export const fetchAppointmentsAPISuccess = createAction(
    '[Appointment API] Fetch Appointments API Success',
    props<{ allAppointments: Appointment[] }>()
);

export const invokeSaveNewAppointmentAPI = createAction(
    '[Appointments API] Invoke Save New Appointment API',
    props<{ newAppointment: Appointment }>()
);

export const saveNewAppointmentAPISucess = createAction(
    '[Appointments API] Save New Appointment API Success',
    props<{ newAppointment: Appointment }>()
);

export const saveNewAppointmentAPIFailure = createAction(
    '[Appointments API] Save New Appointment API Failure',
    props<{ error: any }>()
);