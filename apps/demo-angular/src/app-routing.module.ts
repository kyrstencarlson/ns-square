import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from '@nativescript/angular';

import { HomeComponent } from './home.component';

const routes: Routes = [
   { path: '', redirectTo: '/home', pathMatch: 'full' },
   { path: 'home', component: HomeComponent },
	{ path: 'payments-nativescript-square-sdk', loadChildren: () => import('./plugin-demos/payments-nativescript-square-sdk.module').then(m => m.PaymentsNativescriptSquareSdkModule) },
	{ path: 'square-in-app-payments', loadChildren: () => import('./plugin-demos/square-in-app-payments.module').then(m => m.SquareInAppPaymentsModule) }
];

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule],
})
export class AppRoutingModule {}
