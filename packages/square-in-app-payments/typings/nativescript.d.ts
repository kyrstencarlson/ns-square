export interface CardEntryDelegate {
  onCardEntryDidComplete(status: CardEntryCompletionStatus): void;
  onCardNonceRequestSuccess(cardDetails: SquareCardDetails): any;
}

export interface CardEntryOptions {
  collectPostalCode?: boolean;
  isGiftCard?: boolean;
  themeConfig?: Partial<SQIPTheme>;
}
