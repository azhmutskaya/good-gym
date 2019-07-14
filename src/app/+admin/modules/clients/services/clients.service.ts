import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClientsApi } from '../interfaces/clients';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  private api = './assets/data/clients.json';
  constructor(private http: HttpClient) {}

  getJSON(): Observable<ClientsApi[]> {
    return this.http.get<ClientsApi[]>(`${this.api}`);
  }
}
