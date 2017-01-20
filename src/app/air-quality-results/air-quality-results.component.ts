import { Component} from '@angular/core';
import { AirQuality } from './air-quality-results.model';
@Component({
	inputs: ['airQuality'],
	selector: 'app-air-quality-results',
	templateUrl: './air-quality-results.component.html',
	styleUrls: ['./air-quality-results.component.css']
})
export class AirQualityResultsComponent {

	airQuality: AirQuality;
	
	constructor() { }
}
