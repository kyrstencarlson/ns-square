import { Observable } from '@nativescript/core';
import { CardEntryDelegate, CardEntryOptions, SquareCardEntryThemeConfig } from './typings/nativescript';

declare var SQIPInAppPaymentsSDK;

export class SquareInAppPaymentsCommon extends Observable {
  /**
   * The Square application ID for your app.
   * This is required to use the Square In-App Payments SDK.
   *
   * Set this value before calling any other methods in the SDK.
   *
   * @default null
   */
  public get squareApplicationID(): string | null {
    return SQIPInAppPaymentsSDK.squareApplicationID;
  }

  public set squareApplicationID(appId: string) {
    SQIPInAppPaymentsSDK.squareApplicationID = appId;
  }

  /**
   * iOS Only
   */
  public get canUseApplePay(): boolean {
    return SQIPInAppPaymentsSDK.canUseApplePay;
  }

  public startCardEntry(delegate: CardEntryDelegate, options?: CardEntryOptions) {
    console.error('startCardEntry method not implemented for this platform');
  }
  public dismiss() {
    console.error('dismiss method not implemented for this platform');
  }

  protected createTheme(config?: Partial<SquareCardEntryThemeConfig>) {
    console.error('createTheme method not implemented for this platform');
    return;
  }

  protected getRootViewController() {
    console.error('getRootViewController method not implemented for this platform');
    return null;
  }
}
