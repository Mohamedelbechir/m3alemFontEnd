import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Driver } from '../models/driver';

@Injectable({
  providedIn: 'root'
})
export class DriverService {

  private entityUrl = environment.REST_API_URL + 'drivers';

  constructor(private httpClient: HttpClient) { }

  update(currentDriver: Driver): Observable<Driver> {
    return this.httpClient.put<Driver>(this.entityUrl, currentDriver);
  }
  findAll(): Observable<Driver[]> {
    return this.httpClient.get<Driver[]>(this.entityUrl);
  }
}
