import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Historique } from '../models/historique';
import { TypeUtilisateur } from 'src/Utils/typeUtilisateur';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private entityUrl = environment.REST_API_URL + 'courses';
  private historiesUrl = this.entityUrl + '/histories';

  constructor(private httpClient: HttpClient) { }

  findHistByDriver(cin: string): Observable<Historique[]> {
    return this.httpClient.get<Historique[]>(this.historiesUrl + '/' + cin + '/' + TypeUtilisateur.chauffeur);
  }
  findHistByPassager(cin: string): Observable<Historique[]> {
    return this.httpClient.get<Historique[]>(this.historiesUrl + '/' + cin + '/' + TypeUtilisateur.passager);
  }

}
