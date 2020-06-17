import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Driver } from 'src/app/models/driver';

import * as moment from 'moment';
import { EtatCompte } from 'src/Utils/etatInsciption';
import { MyOperation, TypeOperation } from 'src/Utils/MyOperation';

@Component({
  selector: '[app-driver-list-item]',
  templateUrl: './driver-list-item.component.html',
  styleUrls: ['./driver-list-item.component.scss']
})
export class DriverListItemComponent implements OnInit {
  @Input() driver: Driver;
  @Output() onOperationRequest: EventEmitter<MyOperation> = new EventEmitter<MyOperation>();
  @Output() onRequestHist:EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }
  dateDemande = () => moment(this.driver.dateDemande).lang('fr').fromNow();
  age = () => moment().diff(this.driver.dateNaissance, 'years');
  isBlocked = () => this.driver.etatCompte === EtatCompte.COMPTE_BLOCKED;
  onBlockRequest = () => this.onOperationRequest.emit({ cin: this.driver.cin, type: TypeOperation.blockDriver });
  onActivateRequest = () => this.onOperationRequest.emit({ cin: this.driver.cin, type: TypeOperation.activateDriver });

}
