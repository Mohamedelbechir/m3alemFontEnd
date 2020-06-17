import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-layout',
  template: `
  <app-auth-admin></app-auth-admin>
  `,
  styles: []
})
export class LoginLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
