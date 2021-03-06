import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, share } from 'rxjs/operators';
import { Clients, ClientsApi } from '../interfaces/clients';
import { Filter } from '../interfaces/filter';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  private api = 'api/clients';

  private currentClientSource = new BehaviorSubject(null);
  currentClient = this.currentClientSource.asObservable().pipe(share());

  private filterClientsParamSource = new BehaviorSubject(null);
  filterClientsParam = this.filterClientsParamSource.asObservable().pipe(share());

  private filterIsAciveSourse = new BehaviorSubject(false);
  filterIsAcive = this.filterIsAciveSourse.asObservable().pipe(share());

  constructor(private http: HttpClient) {}

  getClients(): Observable<ClientsApi[]> {
    return this.http.get<ClientsApi[]>(this.api).pipe(
      catchError(this.handleError<ClientsApi[]>('getClients', []))
    );
  }

  editClient(currentClient: Clients | null) {
    this.currentClientSource.next(currentClient);
  }

  filterClient(filter: Filter) {
    this.filterClientsParamSource.next(filter);
  }

  openFilter(state: boolean) {
    this.filterIsAciveSourse.next(state);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return throwError(error);
    };
  }
}
