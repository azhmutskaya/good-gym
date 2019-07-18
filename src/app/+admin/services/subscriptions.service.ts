import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SubscriptionsApi } from '../interfaces/subscriptions';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionsService {
  private api = './assets/data/subscriptions.json';

  constructor(private http: HttpClient) {
  }

  getSubscriptions(): Observable<SubscriptionsApi[]> {
    return this.http.get<SubscriptionsApi[]>(this.api).pipe(
      catchError(this.handleError<SubscriptionsApi[]>('getSubscriptions', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return throwError(error);
    };
  }
}
