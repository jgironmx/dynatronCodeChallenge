import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerRoutingModule } from './customer.routes';
import { SharedModule } from '../shared/shared.module';
import { CustomerFormComponent } from './customer-form/customer-form.component';
import { CustomerListComponent } from './customer-list/customer-list.component';

@NgModule({
  declarations: [CustomerFormComponent, CustomerListComponent],
  imports: [CommonModule, CustomerRoutingModule, SharedModule],
})
export class CustomerModule {}
