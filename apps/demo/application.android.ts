@NativeClass()
@JavaProxy('packages.launchpoint.demo.Application')
export class Application extends android.app.Application {
  override onCreate(): void {
    super.onCreate();
    console.log('[ExampleApplication] onCreate');

    // sqip.CardEntry.setCardNonceBackgroundHandler({
    //   handleEnteredCardInBackground(params) {
    //     console.log('[CardEntry] handleEnteredCardInBackground', params);

    //     return new sqip.CardEntryActivityCommand.Finish();
    //   },
    // });
  }
}
