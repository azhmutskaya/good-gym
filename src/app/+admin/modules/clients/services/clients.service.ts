import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Clients, ClientsApi } from '../interfaces/clients';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  private api = './assets/data/clients.json';

  private currentClientSource = new BehaviorSubject(null);
  currentClient = this.currentClientSource.asObservable();

  private termsSearchSource = new BehaviorSubject(['']);
  termsSearch = this.termsSearchSource.asObservable();

  constructor(private http: HttpClient) {}

  getClients(): Observable<ClientsApi[]> {
    return this.http.get<ClientsApi[]>(this.api).pipe(
      catchError(this.handleError<ClientsApi[]>('getClients', []))
    );
  }

  editClient(currentClient: Clients | null) {
    this.currentClientSource.next(currentClient);
  }

  searchClient(termsSearch: string[]) {
    this.termsSearchSource.next(termsSearch);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return throwError(error);
    };
  }
}
