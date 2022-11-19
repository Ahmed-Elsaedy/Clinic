import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentsCreateComponent } from './views/appointments-create/appointments-create.component';
import { AppointmentsIndexComponent } from './views/appointments-index/appointments-index.component';

const routes: Routes = [
  {
    path: '',
    component: AppointmentsIndexComponent,
  },
  {
    path: 'create',
    component: AppointmentsCreateComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppointmentsRoutingModule { }
