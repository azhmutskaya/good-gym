import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SubscriptionsApi } from '../interfaces/subscriptions';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionsService {
  private api = './assets/data/subscriptions.json';
  constructor(private http: HttpClient) {}

  getJSON(): Observable<SubscriptionsApi[]> {
    return this.http.get<SubscriptionsApi[]>(`${this.api}`);
  }
}
