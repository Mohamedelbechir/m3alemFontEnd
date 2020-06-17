import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';

import {
  Utilisateur
} from '../models/utilisateur';
import {
  Subject
} from 'rxjs';
import {
  DataTableDirective
} from 'angular-datatables';
import {
  UtilisateurService
} from '../services/utilisateur.service';
import * as $ from 'jquery';
import 'datatables.net';
import { TypeUtilisateur } from 'src/Utils/typeUtilisateur';
import { EtatInstription } from 'src/Utils/etatInsciption';
import { dataTableConfig } from 'src/Utils/dataTableConfig';







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
          && item.etatInscription === EtatInstription.EN_ATTENTE_INSCRIPTION)
      );

      //this.tableDataIsLoaded = true;
      this.dtTrigger.next();

    },
      (error) => console.log(error)
    );
  }

  // onSubmit(electeur: Utilisateur) {


  // candidat.date_naissance = moment(candidat.date_naissance).format('yyyy-MM-dd');
  // console.log(electeur.date_naissance);

  //this.utilisateurService.add(electeur).subscribe((data: Utilisateur) => {

  //  this.electeurs.push(data);
  //this.showNotify();
  //this.formElecteur.reset();
  //this.rerender();

  //},
  //(error) => console.log(error)

  //);

  //}
  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }
  // showNotify() {
  // const Toast = Swal.mixin({
  // toast: true,
  //position: 'top-end',
  //showConfirmButton: false,
  //timer: 3000,
  //timerProgressBar: true,
  //onOpen: (toast) => {
  //toast.addEventListener('mouseenter', Swal.stopTimer)
  //toast.addEventListener('mouseleave', Swal.resumeTimer)
  //}
  //});

  //Toast.fire({
  //icon: 'success',
  //title: 'Candidat ajouté avec success!'
  //});
  //}
  //onFileChange(event) {
  //let reader = new FileReader();

  //if (event.target.files && event.target.files.length) {
  //const [file] = event.target.files;
  //reader.readAsDataURL(file);

  //reader.onload = () => {
  //this.formElecteur.patchValue({
  //file: reader.result
  //});
  //};
  //}
  //}
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
        let updateItem = this.utilisateurs.find(item => item.cin = data.cin);
        let index = this.utilisateurs.indexOf(updateItem);
        this.utilisateurs[index] = data;
        this.rerender();
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
}
