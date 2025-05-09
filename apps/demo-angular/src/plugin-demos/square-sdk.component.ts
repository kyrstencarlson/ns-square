import { Component, NgZone } from '@angular/core';
import { DemoSharedSquareSdk } from '@demo/shared';
import { } from '@launchpoint/square-sdk';

@Component({
	selector: 'demo-square-sdk',
	templateUrl: 'square-sdk.component.html',
})
export class SquareSdkComponent {
  
  demoShared: DemoSharedSquareSdk;
  
	constructor(private _ngZone: NgZone) {}

  ngOnInit() {
    this.demoShared = new DemoSharedSquareSdk();
  }

}