import { Component } from '@angular/core';

@Component({
  selector: 'demo-home',
  templateUrl: 'home.component.html',
})
export class HomeComponent {
  demos = [
	{
		name: 'payments-nativescript-square-sdk'
	},
	{
		name: 'square-in-app-payments'
	}
];
}