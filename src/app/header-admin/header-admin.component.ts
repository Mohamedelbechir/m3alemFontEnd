import { Component, OnInit } from '@angular/core';
import { Utilisateur } from '../models/utilisateur';
import { UtilisateurService } from '../services/utilisateur.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-admin',
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.scss']
})
export class HeaderAdminComponent implements OnInit {
  currentUser: Utilisateur;

  constructor(private utilisateurService: UtilisateurService,  ) { }

  ngOnInit() {
    this.utilisateurService.currentUserSubject.subscribe(
      (user: Utilisateur) =>{
        this.currentUser = user;
        console.log(user);
      }
    )
  }
  logOut(){
    this.utilisateurService.logOut();

  }

}

