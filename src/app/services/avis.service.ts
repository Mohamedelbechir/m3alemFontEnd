import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Avis } from '../models/avis';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AvisService {
  private entityUrl = environment.REST_API_URL + 'avis';

  constructor(private httpClient: HttpClient) { }

  findAll(): Observable<Avis[]> {
    return this.httpClient.get<Avis[]>(this.entityUrl);
  }
  delete(id: string): Observable<string> {
    return this.httpClient.delete<string>(this.entityUrl + '/' + id);
  }
}
