import {
  inject,
  fakeAsync,
  tick,
  TestBed
} from '@angular/core/testing';
import {MockBackend} from '@angular/http/testing';
import {
  Http,
  ConnectionBackend,
  BaseRequestOptions,
  Response,
  ResponseOptions
} from '@angular/http';

import {AirNowService} from '../../services/airnow.service';
import {AirQuality} from '../../air-quality-results/air-quality-results.model';

/*
* For some reason the ResponseOptions in the MockBackend contain
* incorrect values when all of the AirNowService unit tests
* are in the same file. All tests work when in separate files.
*
*/
describe('AirNowService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				BaseRequestOptions,
				MockBackend,
				AirNowService,
				{ provide: Http,
					useFactory: (backend: ConnectionBackend,
                       defaultOptions: BaseRequestOptions) => {
                         return new Http(backend, defaultOptions);
                       }, 
					   deps: [MockBackend, BaseRequestOptions] 
				},
			]
		});
	});

	// sets up an expectation that the correct URL will being requested
	function expectURL(backend: MockBackend, url: string, responseStatus: number, responseBody: string) {
		backend.connections.subscribe(c => {
			expect(c.request.url).toBe(url);
			let response = new ResponseOptions({status: responseStatus, body: responseBody});
			c.mockRespond(new Response(response));
		});
	}

	describe('searchBadRequest', () => {
		it('retrieves the air quality reading using the zip code',
			inject([AirNowService, MockBackend], fakeAsync((svc, backend) => {
				let testURL: string = 'https://protected-wildwood-44798.herokuapp.com/zipCodeObservation/282AA';
				let responseStatus: number = 400;
				let responseBody: string = `{"zipCode":null,
											"city":null,"state":null,
											"latitude":null,"longitude":null,
											"ozoneAQI":null,"particulateMatterAQI":null}`;
				let airQuality: AirQuality;
				expectURL(backend, testURL, responseStatus, responseBody);
				svc.search(testURL).subscribe(
					(results: any) => {	
						tick();
						console.log('search test results= ',results);
						airQuality = results.value;
						expect(airQuality.zipCode).toBe(null);
					},
					(err: any) => { // on error
						tick();
						console.log('search test err= ',err);
						expect(err).toBeUndefined();
						
					},
					() => { // on completion
					}
				)
			));
		);}
	});	

});
