import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CustomEventsService {
  constructor(@Inject(DOCUMENT) private document: Document) {}

  public dispatch(eventName: string, data?: any): void {
    const event = new CustomEvent(eventName, { detail: data });
    this.document.dispatchEvent(event);
  }

  public listen(eventName: string, callback: (e: Event) => void) {
    this.document.addEventListener(eventName, callback);
  }

  public unlisten(eventName: string, callback: (e: Event) => void) {
    this.document.removeEventListener(eventName, callback);
  }
}
