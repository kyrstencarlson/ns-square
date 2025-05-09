import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular';
import { SquareSdkComponent } from './square-sdk.component';

@NgModule({
	imports: [NativeScriptCommonModule, NativeScriptRouterModule.forChild([{ path: '', component: SquareSdkComponent }])],
  declarations: [SquareSdkComponent],
  schemas: [ NO_ERRORS_SCHEMA]
})
export class SquareSdkModule {}
