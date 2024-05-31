import { Injectable } from '@angular/core';
import { CustomEventsService } from '../custom-events/custom-events.service';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  constructor(private events: CustomEventsService) {}

  show() {
    this.events.dispatch('loading', { show: true });
  }

  hide() {
    this.events.dispatch('loading', { show: false });
  }
}
