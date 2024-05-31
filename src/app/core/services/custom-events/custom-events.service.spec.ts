import { TestBed } from '@angular/core/testing';
import { DOCUMENT } from '@angular/common';
import { CustomEventsService } from './custom-events.service';

describe('CustomEventsService', () => {
  let service: CustomEventsService;
  let documentSpy: jasmine.SpyObj<Document>;

  beforeEach(() => {
    const documentSpyObj = jasmine.createSpyObj('Document', [
      'addEventListener',
      'removeEventListener',
    ]);

    TestBed.configureTestingModule({
      providers: [
        CustomEventsService,
        { provide: DOCUMENT, useValue: documentSpyObj },
      ],
    });

    service = TestBed.inject(CustomEventsService);
    documentSpy = TestBed.inject(DOCUMENT) as jasmine.SpyObj<Document>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should dispatch custom event', () => {
    const eventName = 'customEvent';
    const eventData = { message: 'Hello' };

    service.dispatch(eventName, eventData);

    expect(documentSpy.dispatchEvent).toHaveBeenCalledWith(
      jasmine.any(CustomEvent)
    );
  });

  it('should listen for custom event', () => {
    const eventName = 'customEvent';
    const callback = jasmine.createSpy('callback');

    service.listen(eventName, callback);

    expect(documentSpy.addEventListener).toHaveBeenCalledWith(
      eventName,
      callback
    );
  });

  it('should unlisten for custom event', () => {
    const eventName = 'customEvent';
    const callback = jasmine.createSpy('callback');

    service.unlisten(eventName, callback);

    expect(documentSpy.removeEventListener).toHaveBeenCalledWith(
      eventName,
      callback
    );
  });
});
