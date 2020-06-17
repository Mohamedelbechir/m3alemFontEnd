import { Component, OnInit } from '@angular/core';
import { Prix } from '../models/prix';
import { PrixService } from '../services/prix.service';
import { FormControl, Validators } from '@angular/forms';
import * as jQuery from 'jquery';
import 'bootstrap-notify';

let $: any = jQuery;

@Component({
  selector: 'app-prix',
  templateUrl: './prix.component.html',
  styleUrls: ['./prix.component.scss']
})
export class PrixComponent implements OnInit {
  prix: Prix;
  nouveauPrix: FormControl = new FormControl('', Validators.required);;
  constructor(private prixService: PrixService) { }

  ngOnInit(): void {
    this.prixService.getPrix().subscribe((data: Prix) => {
      this.prix = data;
    })
  }
  onSave() {
    let newPrix: Prix = {
      ...this.prix,
      prixKm: this.nouveauPrix.value
    };
    this.prixService.update(newPrix).subscribe((data: Prix) => {
      this.prix = data;
      document.getElementById("closeModalPart").click();
      $.notify({
        title: '<strong>Succès!</strong>',
        message: 'Operation effectée avec succès !'
      }, {
        type: 'success'
      });
    });
  }
  onUpdateRequest() {
    document.getElementById("openModalButton").click();
    this.nouveauPrix.setValue(this.prix.prixKm);
  }
}
