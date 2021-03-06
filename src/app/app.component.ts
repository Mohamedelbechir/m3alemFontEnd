import { Component } from '@angular/core';
import { UtilisateurService } from './services/utilisateur.service';
import { Subscription } from 'rxjs';
import { Utilisateur } from './models/utilisateur';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'M3alem';
  isLogin = false;
  dt = Date();
  private userSubcription:  Subscription;
  currentUtilisateur: Utilisateur;

  constructor(private utilisateurService: UtilisateurService){}

  ngOnInit() {
  
    this.userSubcription = this.utilisateurService.currentUser.subscribe(user => {
      this.currentUtilisateur = user;
    
    });


  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.userSubcription.unsubscribe();
    
    
  }
  canShowMenu() {
    return (this.currentUtilisateur!=null) && (this.currentUtilisateur.typeUtilisateur === 'admin');
    }
  }
  

