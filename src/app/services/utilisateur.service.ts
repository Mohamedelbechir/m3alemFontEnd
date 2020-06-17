import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Utilisateur } from '../models/utilisateur';
import { Observable, Subject, BehaviorSubject,  } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  private entityUrl = environment.REST_API_URL +'utilisateurs';
  private loginUrl = environment.REST_API_URL +'login';
  isAuth = false;

  currentUser: Observable<Utilisateur>;

  currentUserSubject: BehaviorSubject<Utilisateur>;

  constructor(private http: HttpClient,private route: Router) { 
    this.currentUserSubject = new BehaviorSubject<Utilisateur>(JSON.parse(localStorage.getItem('currentUSer')));
    this.currentUser = this.currentUserSubject.asObservable();
  }
  public get currentUserValue(): Utilisateur{
    return this.currentUserSubject.value;
  }
 /* setCurrentUser(user: Utilisateur){
    this.currentUser = user;
    //this.userIsLogin = true;
    this.emitUser();
  }
 emitUser() {
        this.currentUserSubject.next( this.currentUser);
        this.isAuth = true;
  }*/
  isLogin(): boolean{
    return this.isAuth;
  }
  userHaslog(){
    this.isAuth = true;
  }
  logOut(){
    this.isAuth = false;
    localStorage.clear();
    this.currentUserSubject.next(null);
    this.route.navigate(['login']);
  }


  login(cin:string, password:string){
    return this.http.get<Utilisateur>(this.loginUrl+'/'+cin+'/'+password).pipe(
     map( (user: Utilisateur) =>{
      if(user){
        localStorage.setItem('currentUSer', JSON.stringify(user));
        this.currentUserSubject.next(user);
      }
      return user;
    }));
  }

  add(utilisateur: Utilisateur) : Observable<Utilisateur>{    
    let headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8',"Access-Control-Allow-Origin":"*"}); 
    return this.http.post<Utilisateur>(this.entityUrl, utilisateur,{headers:headers});

  }
  update(utilsateur: Utilisateur): Observable<Utilisateur> {

    return this.http.put<Utilisateur>(this.entityUrl + '/' + utilsateur.cin, utilsateur);     
  }
  getUtilisateur(){
    return this.http.get<Utilisateur[]>(this.entityUrl);
  }
}
