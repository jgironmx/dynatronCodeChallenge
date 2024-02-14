import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerFormComponent } from './customer-form/customer-form.component';
import { CustomerAction } from '../models/customer-action.model';

export const routes: Routes = [
  {
    path: '',
    component: CustomerListComponent,
  },
  {
    path: 'create',
    component: CustomerFormComponent,
    data: {
      action: CustomerAction.Create,
    },
  },
  {
    path: 'edit/:Id',
    component: CustomerFormComponent,
    data: {
      action: CustomerAction.Edit,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerRoutingModule {}
