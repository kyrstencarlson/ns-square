import { Observable, EventData, Page } from '@nativescript/core';
import { DemoSharedSquareSdk } from '@demo/shared';
import { } from '@launchpoint/square-sdk';

export function navigatingTo(args: EventData) {
	const page = <Page>args.object;
	page.bindingContext = new DemoModel();
}

export class DemoModel extends DemoSharedSquareSdk {
	
}
