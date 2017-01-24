import {Injectable} from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { AirQuality } from '../air-quality-results/air-quality-results.model';

@Injectable()
export class AirNowService{

	data: AirQuality;
	
	constructor(private http: Http) {
	}
	
	search(queryUrl: string): Observable<AirQuality> {
		return this.http.get(queryUrl)
			.map(this.extractData)
			.catch(this.handleError);
	}
	
	private extractData(res: Response): Observable<AirQuality>  {
		/*
			Be careful here. 
			If response status code = 200 the JSON returned is a single object fully populated.
			If response status code != 200 the JSON returned is a single object which is empty.
		*/
		//console.log('AirNowService::extractData() res: ', res);
		this.data = res.json(); // if this fails then handleError will be invoked
		return Observable.of(new AirQuality(
					this.data.zipCode,
					this.data.city,
					this.data.state,
					this.data.latitude,
					this.data.longitude,
					this.data.ozoneAQI,
					this.data.particulateMatterAQI
				));
	}
	
	/*
	* Handle error extracting data from the response body
	*/
	private handleError (error: Response | any) {
		let errStatus: number;
		if (error instanceof Response) {
			errStatus = error.status;
		} 
		else {
			errStatus = 500; // assumes server error
		}
		return Observable.throw(errStatus);
	}
}