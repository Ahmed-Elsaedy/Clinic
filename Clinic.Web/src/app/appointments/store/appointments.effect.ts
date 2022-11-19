import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { select, Store } from "@ngrx/store";
import { AppointmentsService } from "../services/appointments.service";
import { catchError, EMPTY, map, mergeMap, of, switchMap, withLatestFrom } from 'rxjs';
import { invokeFetchAppointmentsAPI, fetchAppointmentsAPISuccess, invokeSaveNewAppointmentAPI, saveNewAppointmentAPISucess, saveNewAppointmentAPIFailure } from "./appointments.action";
import { selectAppointments } from "./appointments.selector";
import { Appstate } from "src/app/shared/store/appstate";
import { setAPIStatus } from "src/app/shared/store/app.action";

@Injectable()
export class AppointmentsEffect {

    constructor(
        private actions$: Actions,
        private appointmentsService: AppointmentsService,
        private store: Store,
        private appStore: Store<Appstate>
    ) { }

    loadAllBooks$ = createEffect(() =>
        this.actions$.pipe(
            ofType(invokeFetchAppointmentsAPI),
            withLatestFrom(this.store.pipe(select(selectAppointments))),
            mergeMap(([, appointmentsFormStore]) => {
                this.appStore.dispatch(
                    setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
                );
                return this.appointmentsService
                    .get()
                    .pipe(map((data) => fetchAppointmentsAPISuccess({ allAppointments: data })));
            })
        )
    );

    saveNewAppointment$ = createEffect(() => {
        this.appStore.dispatch(
            setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        return this.actions$.pipe(
            ofType(invokeSaveNewAppointmentAPI),
            switchMap((action) => {
                return this.appointmentsService
                    .create(action.newAppointment)
                    .pipe(
                        map((data) => {
                            this.appStore.dispatch(
                                setAPIStatus({
                                    apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
                                })
                            );
                            return saveNewAppointmentAPISucess({ newAppointment: data });
                        }),
                        catchError((errorMessage) => {
                            this.appStore.dispatch(
                                setAPIStatus({
                                    apiStatus: { apiResponseMessage: errorMessage.error?.errors['Date'][0] || errorMessage.message, apiStatus: 'failed' },
                                })
                            );
                            return of(saveNewAppointmentAPIFailure({ error: errorMessage }));
                        })
                    );
            })
        );
    });
}