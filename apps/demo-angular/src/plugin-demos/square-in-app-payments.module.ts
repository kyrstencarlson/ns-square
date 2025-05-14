import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular';
import { SquareInAppPaymentsComponent } from './square-in-app-payments.component';

@NgModule({
	imports: [NativeScriptCommonModule, NativeScriptRouterModule.forChild([{ path: '', component: SquareInAppPaymentsComponent }])],
  declarations: [SquareInAppPaymentsComponent],
  schemas: [ NO_ERRORS_SCHEMA]
})
export class SquareInAppPaymentsModule {}
