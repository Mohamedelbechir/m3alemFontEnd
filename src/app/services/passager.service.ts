import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Passager } from '../models/Passager';

@Injectable({
  providedIn: 'root'
})
export class PassagerService {


  private entityUrl = environment.REST_API_URL + 'passagers';

  constructor(private httpClient: HttpClient) { }
  findAll(): Observable<Passager[]> {
    return this.httpClient.get<Passager[]>(this.entityUrl);
  }
  delete(currentDriver: string): Observable<Passager> {
    return this.httpClient.delete<Passager>(this.entityUrl + "/" + currentDriver);
  }
}
