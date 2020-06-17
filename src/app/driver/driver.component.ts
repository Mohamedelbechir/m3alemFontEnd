import { Component, OnInit, ViewChild } from '@angular/core';
import { Driver } from '../models/driver';
import { DriverService } from '../services/driver.service';
import { DataTableDirective } from 'angular-datatables/src/angular-datatables.directive';
import { Subject } from 'rxjs';
import { dataTableConfig } from 'src/Utils/dataTableConfig';
import { EtatCompte } from 'src/Utils/etatInsciption';
import { MyOperation, TypeOperation } from 'src/Utils/MyOperation';
import * as jQuery from 'jquery';
import * as moment from 'moment';
import 'bootstrap-notify';
import { Historique } from '../models/historique';
import { CourseService } from '../services/course.service';


let $: any = jQuery;


@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.scss']
})


export class DriverComponent implements OnInit {

  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  dtOptionsDriver: DataTables.Settings = {};
  dtTriggerDriver: Subject<any> = new Subject()

  drivers: Driver[] = [];
  currentModalMessage: string;
  currentModalTitle: string;
  currentOperation: MyOperation;

  currentHists: Historique[];

  constructor(private driverService: DriverService, private courseService: CourseService) { }

  ngOnInit(): void {
    this.dtOptionsDriver = dataTableConfig;
    this.driverService.findAll().subscribe((data: Driver[]) => {
      this.drivers = data;
    });
  }

  onRequestHist(value: string) {
    document.getElementById("openModalHist").click();
    this.courseService.findHistByDriver(value).subscribe((data: Historique[]) => {

      this.currentHists = data;
    });

  }

  onOperationRequest(value: MyOperation): void {
    this.currentOperation = value;
    value.type == TypeOperation.blockDriver ? this.bockedModal() : this.activedModal();
  }
  bockedModal(): void {
    this.currentModalMessage = "Est-vous sûr de vouloir bloquer ce chauffeur";
    this.currentModalTitle = "Bloquage";
    document.getElementById("openModalButton").click();

  }
  activedModal(): void {
    this.currentModalMessage = "Est-vous sûr de vouloir debloquer ce chauffeur";
    this.currentModalTitle = "Debloquer";
    document.getElementById("openModalButton").click();

  }
  onConfirme() {
    let currentDriver = this.drivers.find((item) => item.cin === this.currentOperation.cin);
    this.currentOperation.type == TypeOperation.blockDriver
      ? currentDriver.etatCompte = EtatCompte.COMPTE_BLOCKED
      : currentDriver.etatCompte = EtatCompte.COMPTE_ACTIVATED;

    this.driverService.update(currentDriver).subscribe((data: Driver) => {
      this.drivers = this.drivers.map<Driver>(item => item.cin === data.cin ? data : item);
      document.getElementById("closeModalPart").click();
      $.notify({
        title: '<strong>Succès!</strong>',
        message: 'Operation effectée avec succès !'
      }, {
        type: 'success'
      });
    });
  }
  depuis = (value) => moment(value).lang('fr').fromNow();
}
