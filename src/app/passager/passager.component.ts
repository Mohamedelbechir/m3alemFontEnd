import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';

import { DataTableDirective } from 'angular-datatables/src/angular-datatables.directive';
import { Subject } from 'rxjs/internal/Subject';
import { Passager } from '../models/Passager';
import { Historique } from '../models/historique';
import { MyOperation } from 'src/Utils/MyOperation';
import { dataTableConfig } from 'src/Utils/dataTableConfig';
import { PassagerService } from '../services/passager.service';

import * as jQuery from 'jquery';
import * as moment from 'moment';
import { CourseService } from '../services/course.service';
let $: any = jQuery;


@Component({
  selector: 'app-passager',
  templateUrl: './passager.component.html',
  styleUrls: ['./passager.component.scss']
})
export class PassagerComponent implements OnInit {

  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  dtOptionsPassager: DataTables.Settings = {};
  dtTriggerPassager: Subject<any> = new Subject()

  passagers: Passager[] = [];
  currentModalMessage: string;
  currentModalTitle: string;
  currentOperation: MyOperation;

  currentHists: Historique[];
  currentPassagerCin: string;

  constructor(private passagerService: PassagerService, private courseService: CourseService) { }

  ngOnInit(): void {
    this.dtOptionsPassager = dataTableConfig;
    this.passagerService.findAll().subscribe((data: Passager[]) => {
      this.passagers = data;
    });
  }
  onRequestHist(value: string) {

    this.courseService.findHistByPassager(value).subscribe((data: Historique[]) => {
      this.currentHists = data;
      document.getElementById("openModalHistPassager").click();
    });

  }
  onDeleteRequest(value: string) {
    this.currentPassagerCin = value;
    document.getElementById('openModalHistPassager').click();
  }
  onConfirmeDelete() {
    this.passagerService.delete(this.currentPassagerCin).subscribe((data: Passager) => {
      this.passagers = this.passagers.filter(item => item.cin !== this.currentPassagerCin);
      document.getElementById("closeModalHistPassager").click();
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
