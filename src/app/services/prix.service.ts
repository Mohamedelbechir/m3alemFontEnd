import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Prix } from '../models/prix';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrixService {

  private entityUrl = environment.REST_API_URL + 'prix';

  constructor(private httpClient: HttpClient) { }

  getPrix() {
    return this.httpClient.get<Prix>(this.entityUrl);
  }
  update(prix: Prix): Observable<Prix> {
    return this.httpClient.put<Prix>(this.entityUrl + '/' + prix.id, prix);
  }
}
