import { SquareInAppPaymentsCommon } from './common';
import { CardEntryDelegate, CardEntryOptions } from './typings/nativescript';

@NativeClass()
export class SQIPCardEntryViewControllerDelegateImpl extends NSObject implements SQIPCardEntryViewControllerDelegate {
  public static ObjCProtocols = [SQIPCardEntryViewControllerDelegate];

  private _delegate: CardEntryDelegate;

  public static initWithDelegate(delegate: CardEntryDelegate): SQIPCardEntryViewControllerDelegateImpl {
    const instance = <SQIPCardEntryViewControllerDelegateImpl>SQIPCardEntryViewControllerDelegateImpl.new();

    instance._delegate = delegate;

    return instance;
  }

  cardEntryViewControllerDidCompleteWithStatus(cardEntryViewController: SQIPCardEntryViewController, status: SQIPCardEntryCompletionStatus): void {
    this._delegate?.onCardEntryDidComplete?.(status);
  }

  cardEntryViewControllerDidObtainCardDetailsCompletionHandler(cardEntryViewController: SQIPCardEntryViewController, cardDetails: SQIPCardDetails, completionHandler: (p1: NSError) => void): void {
    this._delegate?.onCardNonceRequestSuccess?.(cardDetails);
    completionHandler?.(null);
  }
}

export class SquareInAppPayments extends SquareInAppPaymentsCommon {
  public override get squareApplicationID(): string | null {
    return SQIPInAppPaymentsSDK.squareApplicationID;
  }

  public override set squareApplicationID(appId: string) {
    SQIPInAppPaymentsSDK.squareApplicationID = appId;
  }
  public get canUseApplePay(): boolean {
    return SQIPInAppPaymentsSDK.canUseApplePay;
  }

  public override startCardEntry(delegate: CardEntryDelegate, options?: CardEntryOptions): void {
    const theme = this.createTheme(options?.themeConfig);
    const controller = SQIPCardEntryViewController.alloc().initWithThemeIsGiftCard(theme, options?.isGiftCard ?? false);

    const delegateImpl = SQIPCardEntryViewControllerDelegateImpl.initWithDelegate(delegate);
    controller.delegate = delegateImpl;

    controller.collectPostalCode = options?.collectPostalCode ?? true;

    const navController = UINavigationController.alloc().initWithRootViewController(controller);

    const rootVC = this.getRootViewController();
    if (rootVC) {
      rootVC.presentViewControllerAnimatedCompletion(navController, true, null);
    } else {
      console.error('No root view controller found to present Square Card Entry UI');
    }
  }

  public override dismiss(animated = true): void {
    const rootVC = this.getRootViewController();
    if (!rootVC) {
      console.error('No root view controller found to dismiss Square Card Entry UI');
      return;
    }

    const presentedVC = rootVC?.presentedViewController;

    if (presentedVC instanceof UINavigationController && presentedVC.viewControllers.firstObject instanceof SQIPCardEntryViewController) {
      presentedVC.dismissViewControllerAnimatedCompletion(animated, null);
    } else {
      console.warn('No card entry controller is currently presented.');
    }
  }

  override createTheme(config?: Partial<SQIPTheme>): SQIPTheme {
    const theme = SQIPTheme.alloc().init();
    if (!config || (config && !Object.keys(config)?.length)) {
      return theme;
    }

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

  public createApplePayRequest(merchantId: string, countryCode: string, currencyCode: string): PKPaymentRequest {
    return PKPaymentRequest.squarePaymentRequestWithMerchantIdentifierCountryCodeCurrencyCode(merchantId, countryCode, currencyCode);
  }

  public performApplePayNonceRequest(payment: PKPayment, callback: (cardDetails?: SQIPCardDetails, error?: NSError | null) => void): void {
    const request = SQIPApplePayNonceRequest.alloc().initWithPayment(payment);
    request.performWithCompletionHandler((cardDetails: SQIPCardDetails, error: NSError | null) => {
      callback(cardDetails, error);
    });
  }

  override getRootViewController(): UIViewController | undefined {
    const keyWindow = UIApplication.sharedApplication.keyWindow;
    return keyWindow != null ? keyWindow.rootViewController : undefined;
  }
}
