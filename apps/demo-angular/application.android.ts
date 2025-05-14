// import { CardNonceBackgroundHandler } from './src/app/square/delegate/square-background.android';

// @NativeClass()
// @JavaProxy('packages.launchpoint.demo.Application')
// export class Application extends android.app.Application {
//   override onCreate(): void {
//     super.onCreate();
//     console.log('------------------------ Android Application onCreate Override ------------------------');

//     console.log('Setting square background handler');
//     try {
//       const backgroundHandler = new CardNonceBackgroundHandler();
//       sqip.CardEntry.setCardNonceBackgroundHandler(backgroundHandler);
//     } catch (e) {
//       console.log('Error setting square background handler', e);
//     }
//   }
// }

@NativeClass()
@JavaProxy('packages.launchpoint.demo.Application')
export class Application extends android.app.Application {
  override onCreate(): void {
    super.onCreate();
    console.log('------------------------ Android Application onCreate Override ------------------------');

    console.log('Setting square background handler');
    try {
      const backgroundHandler = new sqip.CardNonceBackgroundHandler({
        handleEnteredCardInBackground(params) {
          console.log('FUCKING HANDLED IN THE BACKGROUND YO');
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
