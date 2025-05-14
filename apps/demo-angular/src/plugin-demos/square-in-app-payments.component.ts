import { Component, NgZone } from '@angular/core';
import { DemoSharedSquareInAppPayments } from '@demo/shared';
import {} from '@launchpoint/square-in-app-payments';

@Component({
  selector: 'demo-square-in-app-payments',
  templateUrl: 'square-in-app-payments.component.html',
})
export class SquareInAppPaymentsComponent {
  demoShared: DemoSharedSquareInAppPayments;

  constructor(private _ngZone: NgZone) {}

  ngOnInit() {
    this.demoShared = new DemoSharedSquareInAppPayments();
  }
}
