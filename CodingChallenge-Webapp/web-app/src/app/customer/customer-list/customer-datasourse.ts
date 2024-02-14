import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, catchError, finalize, of, Subscription } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Customer, CustomerResult } from '../../models/customer.model';
import { CustomerService } from '../../services/customer.service';
import { ApiRequest } from '../../models/api-request';

export class CustomerDataSourse implements DataSource<Customer> {
  private customerSubject = new BehaviorSubject<Customer[]>([]);
  private totalRecordsSubject = new BehaviorSubject<number>(0);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private customerSuscription?: Subscription;
  public loading$ = this.loadingSubject.asObservable();
  public totalRecords$ = this.totalRecordsSubject.asObservable();

  private customerSuscriptions: Subscription[] = [];

  constructor(private customerService: CustomerService) {}

  connect(collectionViewer: CollectionViewer): Observable<Customer[]> {
    return this.customerSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.customerSubject.complete();
    this.loadingSubject.complete();
    this.totalRecordsSubject.complete();
  }

  loadCustomers(apiRequest: ApiRequest) {
    this.loadingSubject.next(true);

    if (this.customerSuscription) {
      this.customerSuscription.unsubscribe();
    }

    this.customerSuscription = this.customerService
      .getAll(apiRequest)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((customers) => {
        this.customerSubject.next((customers as CustomerResult).entities);
        this.totalRecordsSubject.next(
          (customers as CustomerResult).totalRecords
        );
      });

    this.customerSuscriptions.push(this.customerSuscription);
  }
}
