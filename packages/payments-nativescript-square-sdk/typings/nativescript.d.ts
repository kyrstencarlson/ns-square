declare class PKPayment extends NSObject {
  token: any; // You can refine this if you use the token
}

export interface SquareCardEntryThemeConfig {
  font: UIFont;
  backgroundColor: UIColor;
  foregroundColor: UIColor;
  textColor: UIColor;
  placeholderTextColor: UIColor;
  tintColor: UIColor;
  messageColor: UIColor;
  errorColor: UIColor;
  saveButtonTitle: string;
  saveButtonFont: UIFont;
  saveButtonTextColor: UIColor;
  keyboardAppearance: UIKeyboardAppearance;
  cancelButton: UIBarButtonItem | null;
}

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

export interface SquareCardDetails {
  nonce: string;
  card: SQIPCard;
}

export interface CardEntryDelegate {
  onCardEntryDidComplete(status: CardEntryCompletionStatus): void;
  onCardNonceRequestSuccess(cardDetails: SquareCardDetails): any;
}

export interface CardEntryOptions {
  collectPostalCode?: boolean;
  isGiftCard?: boolean;
  themeConfig?: Partial<SquareCardEntryThemeConfig>;
}
