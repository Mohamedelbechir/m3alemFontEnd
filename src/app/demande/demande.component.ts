import { Component, OnInit, ViewChild } from '@angular/core';

import { Utilisateur } from '../models/utilisateur';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { UtilisateurService } from '../services/utilisateur.service';
import * as moment from 'moment';

import 'datatables.net';
import { TypeUtilisateur } from 'src/Utils/typeUtilisateur';
import { EtatInstription } from 'src/Utils/etatInsciption';
import { dataTableConfig } from 'src/Utils/dataTableConfig';
import 'bootstrap-notify';
import * as jQuery from 'jquery';
let $: any = jQuery;


@Component({
  selector: 'app-demande',
  templateUrl: './demande.component.html',
  styleUrls: ['./demande.component.scss']
})
export class DemandeComponent implements OnInit {
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject()
  utilisateurs: Utilisateur[];
  selectedUser: Utilisateur;
  onAccept = false;
  onRefuse = false;
  messageOperation: String;

  constructor(private utilisateurService: UtilisateurService) {

  }

  initDataTable(): void {
    this.dtOptions = dataTableConfig
  }


  ngOnInit() {

    this.initDataTable();
    this.utilisateurService.getUtilisateur().subscribe((data: Utilisateur[]) => {
      this.utilisateurs = data.filter(
        (item, index, items) => (item.typeUtilisateur == TypeUtilisateur.chauffeur
         /* && item.etatInscription === EtatInstription.EN_ATTENTE_INSCRIPTION*/)
      );

      //this.tableDataIsLoaded = true;
      this.dtTrigger.next();

    },
      (error) => console.log(error)
    );
  }
  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  onClickAccepter(cin: String) {
    this.selectedUser = this.utilisateurs.find((item) => item.cin === cin);
    this.messageOperation = "Etes-vous sûr de vouloir accepter cette demande ?"
    this.onAccept = true;
    this.onRefuse = false;
    document.getElementById("openModalButton").click();
  }
  onClickRefuser(cin: String) {
    this.selectedUser = this.utilisateurs.find((item) => item.cin === cin);
    this.messageOperation = "Etes-vous sûr de vouloir réfuser cette demande ?"
    this.onRefuse = true;
    this.onAccept = false;
    document.getElementById("openModalButton").click();
  }
  onValidOperation() {
    this.selectedUser.etatInscription = this.onAccept ? EtatInstription.ACCEPTER_INSCRIPTION : EtatInstription.REFUSER_INSCRIPTION;
    this.utilisateurService.update(this.selectedUser).subscribe((data: Utilisateur) => {
      console.log(data);

      if (data != null) {
        this.utilisateurs = this.utilisateurs.map<Utilisateur>(item => item.cin === data.cin ? data : item);
       // this.rerender();
        document.getElementById("closeModalPart").click();

        $.notify({
          title: '<strong>Succès!</strong>',
          message: 'Operation effectée avec succès !'
        }, {
          type: 'success'
        });
      }

    });
  }
  isAccepted(etat: String) {
    return EtatInstription.ACCEPTER_INSCRIPTION === etat;
  }
  isRefused(etat: String) {
    return EtatInstription.REFUSER_INSCRIPTION === etat;
  }
  isAttented(etat: String) {
    return EtatInstription.EN_ATTENTE_INSCRIPTION === etat;
  }
  depuis = (value) => moment(value).lang('fr').fromNow();
}
