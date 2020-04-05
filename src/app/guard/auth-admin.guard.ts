import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UtilisateurService } from '../services/utilisateur.service';

@Injectable({
  providedIn: 'root'
})
export class AuthAdminGuard implements CanActivate{
  constructor(private utilisateurService: UtilisateurService, private route: Router) {
    /* Pour utiliser un service dans unautre service alors on met le decorateur injectable */
}
canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot,): Observable<boolean> | Promise<boolean> | boolean {
    const currentUSer = this.utilisateurService.currentUserValue;
    if (currentUSer) {
        return true;
    }
    
    this.route.navigate(['/login'], {queryParams: {returnUrl: state.url}});
    return false;
    
}
}
