import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-layout',
  template: `
  <app-header-admin></app-header-admin>
  <router-outlet></router-outlet>
  <app-footer></app-footer>
  `,
  styles: []
})
export class HomeLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
