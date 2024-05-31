import { Injectable } from '@angular/core';
import { NavigationError, Router } from '@angular/router';
import { MFE_CONFIG } from '../../../config/mfe.config';
import { ROUTES_LIST } from '../../../config/router.config';
import { filter } from 'rxjs';
import { CustomEventsService } from '../custom-events/custom-events.service';
import { getCurrentPath } from '../../helpers/mfe-path/mfe-path.helper';

@Injectable({
  providedIn: 'root',
})
export class NavigateService {
  constructor(private router: Router, private events: CustomEventsService) {
    this.registrePopStateEvent();
    this.registreNavigateExternalRouter();
  }

  public navigate(path: string): void {
    this.router.navigate([
      {
        outlets: {
          [MFE_CONFIG.name]: [path],
        },
      },
    ]);
  }

  public navigateReplace(path: string): void {
    this.router.navigate(
      [
        {
          outlets: {
            [MFE_CONFIG.name]: [path],
          },
        },
      ],
      {
        replaceUrl: true,
      }
    );
  }

  private registrePopStateEvent(): void {
    this.events.listen(`${MFE_CONFIG.name}:onpopstate`, (e) => {
      const path = (e as CustomEvent)?.detail?.path;
      const newRoute = getCurrentPath(path);
      this.navigateReplace(newRoute);
    });
  }

  private registreNavigateExternalRouter(): void {
    this.router.errorHandler = () => {};
    this.router.events
      .pipe(filter((e) => e instanceof NavigationError))
      .subscribe((e) => {
        if (e instanceof NavigationError) {
          const match = e.url.match(/\(([^:]+):([^)\s]+)\)/);
          const path = match && match[2] ? match[2] : '';
          this.events.dispatch(`external_router`, { path });
        }
      });
  }
}
