import { Component, OnInit, EventEmitter, Output, Input, OnChanges } from '@angular/core';
import { Avis } from 'src/app/models/avis';
import * as moment from 'moment';

@Component({
  selector: '[app-avis-list-item]',
  templateUrl: './avis-list-item.component.html',
  styleUrls: ['./avis-list-item.component.scss']
})
export class AvisListItemComponent implements OnInit, OnChanges {

  @Output() onDeleteRequest: EventEmitter<string> = new EventEmitter<string>();
  @Output() onEdit: EventEmitter<string> = new EventEmitter<string>();
  @Input() avis: Avis;
  nbCheck: Array<number>;
  nbNoCheck: Array<number>;
  humanReadable: string;

  constructor() { }

  ngOnInit(): void {
    this.nbCheck = Array(this.avis.nbEtoile).fill(0).map((x, i) => i);
    this.nbNoCheck = Array(5 - this.avis.nbEtoile).fill(0).map((x, i) => i);

  }
  ngOnChanges(): void {
    this.humanReadable = moment(this.avis.dateAvis).lang('fr').fromNow();
  }

}
