# @launchpoint/square-in-app-payments

```bash
npm install @launchpoint/square-in-app-payments
```

## Usage

### iOS Implementation

A build phase script is required for the SDK to run. There is an after-prepare.js hook added to this plugin.

You will see the following logs in the console:

```bash
✅ Square SDK Build Phase Script Added to Xcode Build Phases
```

If you do not see these logs, prepare the ios platform again prior to build

```bash
    ns prepare ios
```

### Example Component

```typescript
@Component({
  selector: 'ns-square-iap',
  template: ` <Button text="Enter Card Info" (tap)="onTap()"></Button> `,
  standalone: true,
  imports: [CommonModule, NativeScriptCommonModule],
  providers: [SquareInAppPayments],
  schemas: [NO_ERRORS_SCHEMA],
})
export class SquareInAppPaymentsComponent implements OnInit {
  _SquareInAppPayments = inject(SquareInAppPayments);

  isAndroid = isAndroid;

  ngOnInit(): void {
    // The application ID is required to be set before any other methods from the SDK are called.

    this._SquareInAppPayments.squareApplicationID = environment.production ? 'prod-key' : 'sandbox-key';

    // if you want to check if the application ID is set correctly, you can do so by calling the getter for the application ID
    console.log('Square Application ID:', this._SquareInAppPayments.squareApplicationID);
  }

  onTap(): void {
    // this is passed to the delegate to handle the card entry completion
    const delegate: CardEntryDelegate = {
      onCardEntryDidComplete: (status) => {
        console.log('Card entry completed with status:', status);

        if (status === 0) {
          console.log('card entry was cancelled by the user');
          // handle what you want to do when the user cancels
        }
        if (status === 1) {
          console.log('card entry was completed successfully');
          // handle what you want to do when the user completes the card entry
        }

        // iOS only: you must dismiss the card entry bottom sheet to return to your app
        this._SquareInAppPayments.dismiss();
      },
      onCardNonceRequestSuccess: (card) => {
        console.log('Card:', card?.nonce);
        // handle what you want to do with the card nonce
      },
    };

    // Android handles the gift card entry differently, so we need to check if the platform is android and if you're taking a gift card
    if (isAndroid && isGiftCard) {
      this._SquareInAppPayments.startGiftCardEntry();
    } else {
      this._SquareInAppPayments.startCardEntry(delegate, {
        collectPostalCode: true,
        ...(!isAndroid && {
          isGiftCard: false, // iOS takes a boolean for isGiftCard
          // theme configuration is only available on iOS
          themeConfig: {
            tintColor: UIColor.systemBlueColor,
            backgroundColor: UIColor.whiteColor,
            saveButtonTitle: 'Submit',
          },
        }),
      });
    }
  }
}
```

### Android Implementation

Make sure the following are included in your `AndroidManifest.xml` file:

```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
```

When the card entry activity is started, the current application is suspended. To recognize the user's return to the application, and to handle the background activity, you must add the following:

`application.android.ts`

```typescript
@NativeClass()
@JavaProxy('<REPLACE_WITH_APP_NAME>.Application')
export class Application extends android.app.Application {
  override onCreate(): void {
    super.onCreate();

    try {
      // the background handler here is where we handle the card entry activity, like calling the API to process the card

      // todo: so far we cannot have any other imports in this file to pull in a @NativeClass implementation of the CardNonceBackgroundHandler that can be registered with the delegate from the instantiation of the SDK in the component above
      const backgroundHandler = new sqip.CardNonceBackgroundHandler({
        handleEnteredCardInBackground(params) {
          console.log('Card: ', params.getCard());
          console.log('Nonce: ', params.getNonce());
          return new sqip.CardEntryActivityCommand.Finish();
        },
      });
      sqip.CardEntry.setCardNonceBackgroundHandler(backgroundHandler);
    } catch (e) {
      console.log('Error setting square background handler', e);
    }
  }
}
```

Add the following to your `webpack.config.js` file to ensure the application.android.ts file is included in the build.

`webpack.config.js`

```javascript
const webpack = require('@nativescript/webpack');
const { resolve } = require('path');

module.exports = (env) => {
  webpack.init(env);
  webpack.useConfig('angular');

  webpack.chainWebpack((config) => {
    if (webpack.Utils.platform.getPlatformName() === 'android') {
      // make sure the path to the application.android.(js|ts)
      // is relative to the webpack.config.js
      config.entry('application').add('./application.android');
    }
  });

  return webpack.resolveConfig();
};
```

And make sure to add the following to your `tsconfig.json` file to ensure the application.android.ts file is included in the build.

`tsconfig.json`

```json
{
  "include": ["application.android.ts"]
}
```

## License

Apache License Version 2.0
