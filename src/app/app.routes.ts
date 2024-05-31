import { Routes } from '@angular/router';
import { ROUTES_LIST } from './config/router.config';
import { MFE_CONFIG } from './config/mfe.config';

export const routes: Routes = [
  {
    path: ROUTES_LIST.HOME,
    loadComponent: () =>
      import('./features/pages/home/home.component').then(
        (m) => m.HomeComponent
      ),
    outlet: MFE_CONFIG.name,
  },
];
