import { Router } from '@angular/router';
import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subscription, merge, tap } from 'rxjs';
import { filter, mergeMap, finalize } from 'rxjs/operators';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../models/customer.model';
import { CustomerDataSourse } from './customer-datasourse';
import { ModalService } from '../../services/moda.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.scss',
})
export class CustomerListComponent implements AfterViewInit, OnInit, OnDestroy {
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'actions'];
  public dataSource: CustomerDataSourse;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  filterValue: string = '';
  loading = false;

  private customerSuscriptions: Subscription[] = [];

  constructor(
    private customerService: CustomerService,
    private router: Router,
    private modalService: ModalService
  ) {
    this.dataSource = new CustomerDataSourse(this.customerService);
  }

  ngOnInit() {
    this.dataSource.loadCustomers({
      offset: 0,
      limit: 25,
      sortField: 'firstName',
      isSortAscending: true,
    });
  }

  ngAfterViewInit(): void {
    let sort$ = this.sort.sortChange.subscribe(
      () => (this.paginator.pageIndex = 0)
    );
    this.customerSuscriptions.push(sort$);

    let merge$ = merge(this.sort.sortChange, this.paginator.page)
      .pipe(tap(() => this.loadCustomerPage()))
      .subscribe();
    this.customerSuscriptions.push(merge$);
  }

  loadCustomerPage() {
    let requestParams = {
      offset: this.paginator.pageIndex * this.paginator.pageSize,
      limit: this.paginator.pageSize,
      sortField: this.sort.active,
      isSortAscending: this.sort.direction == 'asc',
    };

    if (this.filterValue) {
      const filterParam = {
        filterParam: `${this.filterValue}`,
      };
      requestParams = { ...requestParams, ...filterParam };
    }
    this.dataSource.loadCustomers(requestParams);
  }

  search(filterValue: string) {
    this.paginator.pageIndex = 0;
    this.filterValue = (filterValue || '').trim().toLowerCase();
    this.loadCustomerPage();
  }

  addNew() {
    this.router.navigate(['customers', 'create']);
  }

  editCustomer(customer: Customer){
    //local storage
    //localStorage.setItem('customerId', `${customer.id}` );
    //session storage
    sessionStorage.setItem('customerId', `${customer.id}`);
    this.router.navigate(['customers', 'edit']);
  }

  delete(customer: Customer) {
    this.loading = true;

    let modalSubs$ = this.modalService
      .openDeleteModal({
        data: {
          title: 'Confirm Delete',
          content: `Are you sure you want to delete this Customer?`,
          okText: 'Yes, Delete',
          closeText: 'Cancel',
        },
      })
      .pipe(
        filter((x) => x === true),
        mergeMap((x) => this.customerService.delete(customer.id)),
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe({
        next: (response) => {
          this.loadCustomerPage();
        },
        error: (response) => {
          if (response.error && response.error.message) {
            console.log(response.error.message);
          } else {
            console.log('An error occurred deleting customer');
          }
        },
      });

    this.customerSuscriptions.push(modalSubs$);
  }

  ngOnDestroy(): void {
    this.customerSuscriptions.forEach((subscription) =>
      subscription.unsubscribe()
    );
  }
}
