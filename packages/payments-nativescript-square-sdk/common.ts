import { Observable } from '@nativescript/core';
import { CardEntryDelegate } from '.';
import { SquareCardEntryThemeConfig } from './typings/objc!LinkKit';

declare var SQIPInAppPaymentsSDK;

export class SquareInAppPaymentsCommon extends Observable {
  public get squareApplicationID(): string | null {
    return SQIPInAppPaymentsSDK.squareApplicationID;
  }

  public set squareApplicationID(appId: string | null) {
    SQIPInAppPaymentsSDK.squareApplicationID = appId;
  }

  public startCardEntry(
    delegate: CardEntryDelegate,
    options?: {
      collectPostalCode?: boolean;
      isGiftCard?: boolean;
      themeConfig?: Partial<SquareCardEntryThemeConfig>;
    },
  ) {
    console.error('startCardEntry method not implemented for this platform');
  }
  public dismiss() {
    console.error('dismiss method not implemented for this platform');
  }

  protected createTheme(config?: Partial<SquareCardEntryThemeConfig>) {
    console.error('createTheme method not implemented for this platform');
    return;
  }
}
