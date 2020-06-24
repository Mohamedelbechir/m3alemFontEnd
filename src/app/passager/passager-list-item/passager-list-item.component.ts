import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Passager } from 'src/app/models/Passager';

import * as moment from 'moment';

@Component({
  selector: '[app-passager-list-item]',
  templateUrl: './passager-list-item.component.html',
  styleUrls: ['./passager-list-item.component.scss']
})
export class PassagerListItemComponent implements OnInit {

  @Input() passager: Passager;
  @Output() onDeleteRequest: EventEmitter<string> = new EventEmitter<string>();
  @Output() onRequestHist: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  depuis = (value) => moment(value).lang('fr').fromNow();
}
