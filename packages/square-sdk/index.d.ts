import { SquareSdkCommon } from './common';

export declare class SquareSdk extends SquareSdkCommon {}

export enum CardEntryCompletionStatus {
  Canceled = 0,
  Success = 1,
}

export interface CardEntryDelegate {
  onCardEntryDidComplete(status: CardEntryCompletionStatus): void;
  onCardNonceRequestSuccess(cardDetails: any): void;
  onCardEntryCancel(): void;
}

export class InAppPaymentsSDK {
  static squareApplicationID: string | null;
  static readonly canUseApplePay: boolean;
}

export class CardEntry {
  static start(delegate: CardEntryDelegate): void;
}
