import {
  bootstrapApplication,
  createApplication,
} from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { ApplicationRef, isDevMode } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import 'zone.js';
import { MFE_CONFIG } from './app/config/mfe.config';

if (!isDevMode()) {
  bootstrapApplication(AppComponent, appConfig).catch((err) =>
    console.error(err)
  );
} else {
  (async () => {
    const app: ApplicationRef = await createApplication(appConfig);

    const myCustomElement = createCustomElement(AppComponent, {
      injector: app.injector,
    });
    customElements.define(MFE_CONFIG.tag, myCustomElement);
  })();
}
