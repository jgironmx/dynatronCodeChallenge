import { Component, OnDestroy, OnInit } from '@angular/core';
import { CustomerAction } from '../../models/customer-action.model';
import { Customer } from '../../models/customer.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrl: './customer-form.component.scss',
})
export class CustomerFormComponent implements OnInit, OnDestroy {
  ActionType = CustomerAction;
  action!: CustomerAction;
  model?: Customer;
  isLoading = false;
  errorMessage?: string;

  private customerSuscriptions: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private customerService: CustomerService //private toastService: ToastService
  ) {}

  ngOnInit() {
    this.action = this.route.snapshot.data['action'];
    if (this.action == CustomerAction.Edit) {
      //const id = this.route.snapshot.params['Id'];
      const id = localStorage.getItem('customerId') as string;
      let customerSubs = this.customerService
        .getById(parseInt(id))
        .subscribe((a) => (this.model = a));
      this.customerSuscriptions.push(customerSubs);
    } else {
      this.model = {} as Customer;
    }
  }

  onSubmit(f: NgForm) {
    if (!f.valid) {
      this.errorMessage = 'Some fields are required.';
      return;
    }

    this.isLoading = true;
    if (this.action === CustomerAction.Edit) {
      let customerSubs = this.customerService
        .update(this.model!.id, this.model!)
        .subscribe({
          next: (a) => {
            this.model = a;
            this.router.navigate(['customers']);
          },
          error: () => {
            this.errorMessage =
              'Sorry, we are experiencing a technical issue. Please try again later.';
          },
        });
      this.customerSuscriptions.push(customerSubs);
    } else if (this.action === CustomerAction.Create) {
      let customerSubs = this.customerService.create(this.model!).subscribe({
        next: (a) => {
          this.router.navigate(['customers']);
        },
        error: () => {
          this.errorMessage =
            'Sorry, we are experiencing a technical issue. Please try again later.';
        },
      });
      this.customerSuscriptions.push(customerSubs);
    }
  }

  onCancel() {
    this.router.navigate(['customers']);
  }

  ngOnDestroy(): void {
    this.customerSuscriptions.forEach((subscription) =>
      subscription.unsubscribe()
    );
  }
}
