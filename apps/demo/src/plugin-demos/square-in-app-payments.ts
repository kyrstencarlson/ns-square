import { Observable, EventData, Page } from '@nativescript/core';
import { DemoSharedSquareInAppPayments } from '@demo/shared';
import { } from '@launchpoint/square-in-app-payments';

export function navigatingTo(args: EventData) {
	const page = <Page>args.object;
	page.bindingContext = new DemoModel();
}

export class DemoModel extends DemoSharedSquareInAppPayments {
	
}
