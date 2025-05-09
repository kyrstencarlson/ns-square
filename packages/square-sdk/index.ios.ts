import { SquareSdkCommon } from './common';

declare var SQIPInAppPaymentsSDK, SQIPCardEntryViewController, SQIPCardEntryViewControllerDelegate, SQIPTheme, SQIPApplePayNonceRequest;
declare var PKPaymentRequest;

export enum CardEntryCompletionStatus {
  Canceled = 0,
  Success = 1,
}

export interface CardEntryDelegate {
  onCardEntryDidComplete(status: CardEntryCompletionStatus): void;
  onCardNonceRequestSuccess(cardDetails: any): void;
  onCardEntryCancel(): void;
}

export function createCardEntryDelegate(delegate: CardEntryDelegate): NSObject {
  const Impl = (NSObject as any).extend(
    {
      cardEntryViewControllerDidCancel(controller: any): void {
        console.log('🟡 Delegate cancel method called');
        delegate?.onCardEntryCancel?.();
      },

      cardEntryViewControllerDidCompleteWithStatus(controller: any, status: number): void {
        console.log('CardEntryViewControllerDidCompleteWithStatus');
        delegate?.onCardEntryDidComplete?.(status);
      },
      cardEntryViewControllerDidObtainCardDetailsCompletionHandler(controller: any, cardDetails: any, completionHandler: any): void {
        console.log('CardEntryViewControllerDidObtainCardDetailsCompletionHandler');
        delegate?.onCardNonceRequestSuccess?.(cardDetails);
        if (typeof completionHandler === 'function') {
          completionHandler(null);
        }
      },

      // Multi-part selector requires full quoted key ??
      'cardEntryViewController:didObtainCardDetails:completionHandler:': function (controller: any, cardDetails: any, completionHandler: (error: NSError | null) => void): void {
        console.log('cardEntryViewController:didObtainCardDetails:completionHandler:');

        delegate?.onCardNonceRequestSuccess?.(cardDetails);
        completionHandler(null);
      },

      __metadata: () => ({
        protocols: ['SQIPCardEntryViewControllerDelegate'],
        methods: {
          cardEntryViewControllerDidCancel: {
            returns: interop.types.void,
            params: [interop.types.id],
          },
          cardEntryViewControllerDidCompleteWithStatus: {
            returns: interop.types.void,
            params: [interop.types.id, interop.types.int8],
          },
          cardEntryViewControllerDidObtainCardDetailsCompletionHandler: {
            returns: interop.types.void,
            params: [interop.types.id, interop.types.id, interop.types.void],
          },
          'cardEntryViewController:didObtainCardDetails:completionHandler:': {
            returns: interop.types.void,
            params: [interop.types.id, interop.types.id, interop.types.void],
          },
        },
      }),
    },
    {
      name: 'CardEntryDelegateImpl',
    },
  );

  return new Impl();
}

export class SquareSdk extends SquareSdkCommon {
  static get squareApplicationID(): string | null {
    return SQIPInAppPaymentsSDK.squareApplicationID;
  }

  static set squareApplicationID(appId: string | null) {
    SQIPInAppPaymentsSDK.squareApplicationID = appId;
  }

  static get canUseApplePay(): boolean {
    return SQIPInAppPaymentsSDK.canUseApplePay;
  }

  static startCardEntry(delegate: CardEntryDelegate, options?: { collectPostalCode?: boolean; isGiftCard?: boolean; themeConfig?: Partial<SquareCardEntryThemeConfig> }) {
    const theme = this.createTheme(options?.themeConfig);
    const controller = SQIPCardEntryViewController.alloc().initWithThemeIsGiftCard(theme, options?.isGiftCard ?? false);
    controller.delegate = createCardEntryDelegate(delegate);
    controller.collectPostalCode = options?.collectPostalCode ?? true;

    const rootVC = UIApplication.sharedApplication.keyWindow.rootViewController;
    rootVC.presentViewControllerAnimatedCompletion(controller, true, null);
  }

  static dismissCardEntry(animated = true) {
    const rootVC = UIApplication.sharedApplication.keyWindow.rootViewController;
    const presentedVC = rootVC.presentedViewController;

    if (presentedVC instanceof SQIPCardEntryViewController) {
      presentedVC.dismissViewControllerAnimatedCompletion(animated, null);
    }
  }

  static createTheme(config?: Partial<SquareCardEntryThemeConfig>): any {
    const theme = SQIPTheme.alloc().init();
    if (!config) return theme;

    if (config.font) theme.font = config.font;
    if (config.backgroundColor) theme.backgroundColor = config.backgroundColor;
    if (config.foregroundColor) theme.foregroundColor = config.foregroundColor;
    if (config.textColor) theme.textColor = config.textColor;
    if (config.placeholderTextColor) theme.placeholderTextColor = config.placeholderTextColor;
    if (config.tintColor) theme.tintColor = config.tintColor;
    if (config.messageColor) theme.messageColor = config.messageColor;
    if (config.errorColor) theme.errorColor = config.errorColor;
    if (config.saveButtonTitle) theme.saveButtonTitle = config.saveButtonTitle;
    if (config.saveButtonFont) theme.saveButtonFont = config.saveButtonFont;
    if (config.saveButtonTextColor) theme.saveButtonTextColor = config.saveButtonTextColor;
    if (config.keyboardAppearance !== undefined) theme.keyboardAppearance = config.keyboardAppearance;
    if (config.cancelButton) theme.cancelButton = config.cancelButton;

    return theme;
  }

  static createApplePayRequest(merchantId: string, countryCode: string, currencyCode: string): typeof PKPaymentRequest {
    return PKPaymentRequest.squarePaymentRequestWithMerchantIdentifierCountryCodeCurrencyCode(merchantId, countryCode, currencyCode);
  }

  static performApplePayNonceRequest(payment: PKPayment, callback: (cardDetails?: any, error?: NSError | null) => void): void {
    const request = SQIPApplePayNonceRequest.alloc().initWithPayment(payment);
    request.performWithCompletionHandler((cardDetails: any, error: NSError | null) => {
      callback(cardDetails, error);
    });
  }
}

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
