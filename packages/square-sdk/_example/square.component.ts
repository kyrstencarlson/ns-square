import { Component, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NativeScriptCommonModule } from '@nativescript/angular';
import { CardEntryDelegate, SquareSdk } from '../index.ios';

@Component({
  selector: 'ns-square',
  templateUrl: './square.component.html',
  standalone: true,
  imports: [CommonModule, NativeScriptCommonModule],
  schemas: [NO_ERRORS_SCHEMA],
})
export class SquareComponent implements OnInit {
  constructor(private _SquareSdk: SquareSdk) {}
  ngOnInit(): void {
    this._SquareSdk.squareApplicationID = 'sandbox-sq0idb-1_YMs90E3w6EyVCmmTbZZw';
  }
  onTap(): void {
    const delegate: CardEntryDelegate = {
      onCardEntryCancel: () => {
        console.log('Cancel');
      },
      onCardEntryDidComplete: (status) => {
        console.log('Complete:', status);
      },
      onCardNonceRequestSuccess: (card) => {
        console.log('Card:', card?.nonce);
      },
    };

    this._SquareSdk.startCardEntry(delegate, {
      themeConfig: {
        tintColor: UIColor.systemBlueColor,
        backgroundColor: UIColor.whiteColor,
        saveButtonTitle: 'Pay Now',
      },
    });
  }
}
