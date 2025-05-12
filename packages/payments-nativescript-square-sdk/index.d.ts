import { SquareInAppPaymentsCommon } from './common';

export declare class SquareInAppPayments extends SquareInAppPaymentsCommon {}

export enum CardEntryCompletionStatus {
  Canceled = 0,
  Success = 1,
}

export interface SquareCardDetails {
  nonce: string;
  card: SQIPCard;
}

export interface SQIPCard {
  /**
   * The card brand (for example, Visa).
   */
  brand: number;

  /**
   * The last 4 digits of the card number.
   */
  lastFourDigits: string;

  /**
   * The expiration month of the card. Ranges between 1 and 12.
   */
  expirationMonth: number;

  /**
   * The 4-digit expiration year of the card.
   */
  expirationYear: number;

  /**
   * The billing postal code associated with the card, if available.
   */
  postalCode?: string;

  /**
   * The type of card (for example, Credit or Debit).
   * Note: This property is experimental and will always return unknown.
   */
  type: number;

  /**
   * The prepaid type of the credit card (e.g., a Prepaid Gift Card).
   * Note: This property is experimental and will always return unknown.
   */
  prepaidType: number;
}

export interface CardEntryDelegate {
  onCardEntryDidComplete(status: CardEntryCompletionStatus): void;
  onCardNonceRequestSuccess(cardDetails: SquareCardDetails): any;
}
