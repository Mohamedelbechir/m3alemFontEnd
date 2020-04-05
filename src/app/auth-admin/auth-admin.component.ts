import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UtilisateurService } from '../services/utilisateur.service';
import { Utilisateur } from '../models/utilisateur';
import { Router, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-auth-admin',
  templateUrl: './auth-admin.component.html',
  styleUrls: ['./auth-admin.component.scss']
})
export class AuthAdminComponent implements OnInit {
  formLogin: FormGroup;
  utilisateur: Utilisateur;
  errorMessage = '';
  returnUrl: string;

  constructor(private formBuilder: FormBuilder,private route: Router,private activatedRoute: ActivatedRoute, private utilisateurService: UtilisateurService) { }
  initFormulaire() {
    this.formLogin = this.formBuilder.group({
 
      cin: ['', [Validators.required]],
      password: ['', Validators.required],    
    

    });
  }

  ngOnInit() {
    this.initFormulaire();
    //this.returnUrl = this.state.url;
   // this.returnUrl = this.route.routerState.snapshot.url;
    this.returnUrl = this.activatedRoute.snapshot.paramMap.get('returnUrl') || '/';
    console.log(this.returnUrl);

  }
  onSubmit(formuaire){
    console.log('hello'+this.formLogin.value.cin);
    
    this.utilisateurService.login(this.formLogin.value.cin,
       this.formLogin.value.password)
       .pipe(first())
       .subscribe((data: Utilisateur) =>{
          this.utilisateur = data;
         // this.utilisateurService.setCurrentUser(data);
          this.route.navigate(['home']);
      },
       (error) =>{
         this.errorMessage = 'cin ou mot de passe incorrete';  

       }

    );

  }
}
