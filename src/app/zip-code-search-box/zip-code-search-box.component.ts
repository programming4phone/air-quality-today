import { Component, OnInit, EventEmitter  } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { AirQuality } from '../air-quality-results/air-quality-results.model';


@Component({
  selector: 'app-zip-code-search-box',
  outputs: ['results'],
  templateUrl: './zip-code-search-box.component.html',
  styleUrls: ['./zip-code-search-box.component.css']
})
export class ZipCodeSearchBoxComponent {

	zipSearchFormGroup: FormGroup;
	http: Http;
	data: AirQuality;
	loading: boolean;
	serverValidationError: boolean;
	serverInternalError: boolean;
	requiredValidationError: boolean;
	readingUnavailableError: boolean;
	results: EventEmitter<AirQuality> = new EventEmitter<AirQuality>();
	
  constructor(fb: FormBuilder, http: Http) {
    this.http = http;
    this.zipSearchFormGroup = fb.group({
      'zipcode': ['']
    });
	this.serverValidationError = false;
	this.serverInternalError = false;
  }

  onSubmit(value: string): void {
	this.serverValidationError = false;
	this.serverInternalError = false;
	this.requiredValidationError = false;
	this.readingUnavailableError = false;
    let enteredZipCode : string = this.zipSearchFormGroup.controls['zipcode'].value;
	if(enteredZipCode) {
		let airNowUrl : string = `https://protected-wildwood-44798.herokuapp.com/zipCodeObservation/${enteredZipCode}`;
		console.log('airNowUrl: ', airNowUrl);
		this.loading = true;
		this.search(airNowUrl)
			.subscribe(
				(results: any) => {
					console.log('subscribe() results.value: ', results.value);
					if(results.value.city){
						this.results.emit(results.value);
					}
					else{
						this.readingUnavailableError = true;
					}
					this.loading = false;
				},
				(err: any) => { // on error
					console.log(err);
					if(err == 400){
						this.serverValidationError = true;
					}
					else{
						this.serverInternalError = true;
					}
					this.results.emit(null);
					this.loading = false;
				},
				() => { // on completion
					this.loading = false;
				}
			);
	}
	else{
		this.requiredValidationError = true;
	}
  }
  
  
  	private search(queryUrl: string): Observable<AirQuality> {
		return this.http.get(queryUrl)
			.map(this.extractData)
			.catch(this.handleError);
	}
	
	private extractData(res: Response): Observable<AirQuality>  {
		/*
			Be careful here. The JSON returned is a single object
		*/
		
		this.data = res.json();
		console.log('data: ', this.data);
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
