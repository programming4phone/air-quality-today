import { Component, OnInit, EventEmitter  } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AirQuality } from '../air-quality-results/air-quality-results.model';
import { AirNowService } from '../services/airnow.service';

@Component({
  selector: 'app-zip-code-search-box',
  outputs: ['results'],
  templateUrl: './zip-code-search-box.component.html',
  styleUrls: ['./zip-code-search-box.component.css']
})
export class ZipCodeSearchBoxComponent {

	static BASE_URL: string = 'https://protected-wildwood-44798.herokuapp.com/zipCodeObservation/';
	
	zipSearchFormGroup: FormGroup;
	loading: boolean;
	serverValidationError: boolean;
	serverInternalError: boolean;
	requiredValidationError: boolean;
	readingUnavailableError: boolean;
	results: EventEmitter<AirQuality> = new EventEmitter<AirQuality>();
	zipCodeRegex: RegExp;
	
	constructor(fb: FormBuilder, private airNowService: AirNowService) {
		this.zipCodeRegex = new RegExp('[0-9]{5}');
		this.zipSearchFormGroup = fb.group({
			'zipcode': ['']
		});
		this.clearErrors();
	}

	clearErrors(): void{
		this.serverValidationError = false;
		this.serverInternalError = false;
		this.requiredValidationError = false;
		this.readingUnavailableError = false;
	}
	onSubmit(value: string): void {
		this.clearErrors();
		let enteredZipCode : string = this.zipSearchFormGroup.controls['zipcode'].value;
		if(enteredZipCode) {
			if(this.zipCodeRegex.test(enteredZipCode)){
				let airNowUrl : string = `${ZipCodeSearchBoxComponent.BASE_URL}${enteredZipCode}`;
				console.log('airNowUrl: ', airNowUrl);
				this.loading = true;
				this.airNowService.search(airNowUrl)
					.subscribe(
						(results: any) => {
							console.log('ZipCodeSearchBoxComponent::onSubmit() subscribe results.value: ', results.value);
							if(results.value.city){
								this.results.emit(results.value);
							}
							else{
								this.readingUnavailableError = true;
								this.results.emit(null);
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
				this.serverValidationError = true;
			}
		}
		else{
			this.requiredValidationError = true;
		}
	}
}
