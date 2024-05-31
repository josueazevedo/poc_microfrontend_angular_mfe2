import {
  APP_BASE_HREF,
  PathLocationStrategy,
  PlatformLocation,
} from '@angular/common';
import { Inject, Injectable, Optional } from '@angular/core';
import { UrlSerializer } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CustomLocationStrategyService extends PathLocationStrategy {
  constructor(
    private plat: PlatformLocation,
    private url: UrlSerializer,
    @Optional() @Inject(APP_BASE_HREF) _baseHref?: string
  ) {
    super(plat, _baseHref);
  }

  override prepareExternalUrl(internal: string): string {
    let path = super.prepareExternalUrl(internal);
    path = path.replace(/\/\((\w+):(\w+)\)/, '/$1/$2').replace('(', '');
    const url = this.url.parse(path);
    return url.toString();
  }
}
