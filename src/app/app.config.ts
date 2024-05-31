import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { LocationStrategy } from '@angular/common';
import { CustomLocationStrategyService } from './core/services/location-strategy/custom-location-strategy.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    { provide: LocationStrategy, useClass: CustomLocationStrategyService },
  ],
};
