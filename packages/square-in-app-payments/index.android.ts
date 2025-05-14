import { Application } from '@nativescript/core';
import { SquareInAppPaymentsCommon } from './common';
import { CardEntryOptions } from './typings/nativescript';

@NativeClass()
export class CheckoutActivity extends android.app.Activity {
  public static readonly DEFAULT_CARD_ENTRY_REQUEST_CODE = 1;

  constructor() {
    super();
    return global.__native(this);
  }

  public onCreate(savedInstanceState: android.os.Bundle): void {
    super.onCreate(savedInstanceState);

    const layoutId = this.getResources().getIdentifier('activity_checkout', 'layout', this.getPackageName());
    const sheetView = this.getLayoutInflater().inflate(layoutId, null);
    this.setContentView(sheetView);

    const buttonId = this.getResources().getIdentifier('addCardButton', 'id', this.getPackageName());
    const addCardButton = sheetView.findViewById(buttonId);

    addCardButton.setOnClickListener(
      new android.view.View.OnClickListener({
        onClick: () => {
          sqip.CardEntry.startCardEntryActivity(this, true, CheckoutActivity.DEFAULT_CARD_ENTRY_REQUEST_CODE);
        },
      }),
    );
  }

  public onActivityResult(requestCode: number, resultCode: number, data: android.content.Intent): void {
    console.log('onActivityResult', requestCode, resultCode, data);

    super.onActivityResult(requestCode, resultCode, data);

    sqip.CardEntry.handleActivityResult(
      data,
      new sqip.Callback<sqip.CardEntryActivityResult>({
        onResult(result: sqip.CardEntryActivityResult) {
          console.log('CardEntryActivityResult:', result);
          if (result.isSuccess()) {
            const cardResult = result.getSuccessValue();
            const card = cardResult.getCard();
            const nonce = cardResult.getNonce();
            console.log('[CardEntry] Success:', nonce);
          } else if (result.isCanceled()) {
            console.log('[CardEntry] Canceled');
            const context = Application.android.context;
            android.widget.Toast.makeText(context, 'Canceled', android.widget.Toast.LENGTH_SHORT).show();
          }
        },
      }),
    );
  }
}

@NativeClass()
export class CardEntryBackgroundHandler extends java.lang.Object implements sqip.CardNonceBackgroundHandler {
  public static interfaces = [sqip.CardNonceBackgroundHandler];

  constructor() {
    super();
    return global.__native(this);
  }

  public handleEnteredCardInBackground(cardDetails: sqip.CardDetails): any {
    try {
      const nonce = cardDetails.getNonce();
      console.log('[CardEntryBackgroundHandler] Received nonce:', nonce);

      const response = this.simulateBackend(nonce);

      if (response.isSuccessful()) {
        return new sqip.CardEntryActivityCommand.Finish();
      } else {
        return new sqip.CardEntryActivityCommand.ShowError(response.errorMessage);
      }
    } catch (e) {
      const context = Application.android.context;
      const resources = context.getResources();
      const msg = resources.getString(resources.getIdentifier('network_failure', 'string', context.getPackageName()));

      return new sqip.CardEntryActivityCommand.ShowError(msg);
    }
  }

  private simulateBackend(nonce: string): { isSuccessful(): boolean; errorMessage: string } {
    return {
      isSuccessful: () => true, // Simulate success
      errorMessage: 'Payment failed on server.',
    };
  }
}

export class SquareInAppPayments extends SquareInAppPaymentsCommon {
  constructor() {
    super();
    return global.__native(this);
  }

  public override get squareApplicationID(): string {
    return sqip.InAppPaymentsSdk.getSquareApplicationId();
  }

  public override set squareApplicationID(app_id: string) {
    sqip.InAppPaymentsSdk.setSquareApplicationId(app_id);
  }

  public handleActivityResult(activity: android.app.Activity, requestCode: number, resultCode: number, data: android.content.Intent): void {
    const CardEntry = sqip.CardEntry;
    const Toast = android.widget.Toast;

    CardEntry.handleActivityResult(
      data,
      new sqip.Callback<sqip.CardEntryActivityResult>({
        onResult(params: sqip.CardEntryActivityResult) {
          console.log('CardEntryActivityResult:', params);
        },
      }),
    );
  }

  public startEntry(options?: CardEntryOptions) {
    const activity = Application.android.foregroundActivity || Application.android.startActivity;

    if (!activity) {
      console.error('No active Android activity found');
      return;
    }

    sqip.CardEntry.startCardEntryActivity(activity, options?.collectPostalCode ?? true, CheckoutActivity.DEFAULT_CARD_ENTRY_REQUEST_CODE);
  }

  startGiftCardEntry() {
    const activity = Application.android.foregroundActivity || Application.android.startActivity;

    if (!activity) {
      console.error('No active Android activity found');
      return;
    }

    sqip.CardEntry.startGiftCardEntryActivity(activity);
  }
}
