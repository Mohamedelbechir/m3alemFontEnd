import { Component, OnInit, ViewChild } from '@angular/core';
import { Avis } from '../models/avis';
import { DataTableDirective } from 'angular-datatables/src/angular-datatables.directive';
import { Subject } from 'rxjs';
import { AvisService } from '../services/avis.service';
import { dataTableConfig } from 'src/Utils/dataTableConfig';
import * as jQuery from 'jquery';
import 'bootstrap-notify';

let $: any = jQuery;


@Component({
  selector: 'app-avis',
  templateUrl: './avis.component.html',
  styleUrls: ['./avis.component.scss']
})
export class AvisComponent implements OnInit {
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  dtOptionsAvis: DataTables.Settings = {};
  dtTriggerAvis: Subject<any> = new Subject()
  avies: Avis[] = [];
  message: string;
  deleteItemIndex: string;

  constructor(private avisService: AvisService) { }

  ngOnInit(): void {
    this.dtOptionsAvis = dataTableConfig;

    this.avisService.findAll().subscribe((data: Avis[]) => {
      this.avies = data;
      this.dtTriggerAvis.next();
    });
  }
  onDeleteConfirme() {
    console.log('confirme');
    this.avisService.delete(this.deleteItemIndex).subscribe((deletedId: string) => {
      this.avies = this.avies.filter(item => item.id !== deletedId);
      this.rerender();
      document.getElementById("closeModalPart").click();

      $.notify({
        title: '<strong>Succès!</strong>',
        message: 'Avis supprimée avec succès'
      }, {
        type: 'success'
      });

    });
  }
  onDeleteRequest(value: string) {
    document.getElementById("openModalButton").click();
    this.deleteItemIndex = value;
    console.log(this.deleteItemIndex);
  }

  rerender(): void {
    console.log(this.dtElement);
    /* this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
       // Destroy the table first
       dtInstance.destroy();
       // Call the dtTrigger to rerender again
       this.dtTriggerAvis.next();
     });*/
  }
  ngOnDestroy(): void {
    this.dtTriggerAvis.unsubscribe();
  }
}
