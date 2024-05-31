import {
  bootstrapApplication,
  createApplication,
} from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { ApplicationRef } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import 'zone.js';
import { MFE_CONFIG } from './app/config/mfe.config';

(async () => {
  const app: ApplicationRef = await createApplication(appConfig);

  const myCustomElement = createCustomElement(AppComponent, {
    injector: app.injector,
  });
  customElements.define(MFE_CONFIG.tag, myCustomElement);
})();

const run = () => {
  bootstrapApplication(AppComponent, appConfig).catch((err) =>
    console.error(err)
  );
};
