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

	describe('searchSuccess', () => {
		it('retrieves the air quality reading using the zip code',
			inject([AirNowService, MockBackend], fakeAsync((svc, backend) => {
				let testURL: string = 'https://protected-wildwood-44798.herokuapp.com/zipCodeObservation/28211';
				let responseStatus: number = 200;
				let responseBody: string = `{"zipCode":"28211",
											"city":"Charlotte","state":"NC",
											"latitude":35.227,"longitude":-80.843,
											"ozoneAQI":20,"particulateMatterAQI":52}`;
				let airQuality: AirQuality;
				expectURL(backend, testURL, responseStatus, responseBody);
				svc.search(testURL).subscribe(
					(results: any) => {	
						//console.log('search test results= ',results);
						airQuality = results.value;
						//console.log('search test airQuality= ',airQuality);
						tick();
						expect(airQuality.city).toBe('Charlotte');
						expect(airQuality.ozoneDescription).toBe('Good');
						expect(airQuality.pmDescription).toBe('Moderate');
						expect(airQuality.zipCode).toBe('28211');
					},
					(err: any) => { // on error
						//console.log(err);
						expect(err).toBeUndefined();
						
					},
					() => { // on completion
					}
				)
			));
		);}
	});

});
