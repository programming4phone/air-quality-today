import { Component  } from '@angular/core';
import { AirQuality } from '../air-quality-results/air-quality-results.model';
@Component({
  selector: 'app-home-route',
  templateUrl: './home-route.component.html',
  styleUrls: ['./home-route.component.css']
})
export class HomeRouteComponent  {

   results: AirQuality;
  
 	/*
		Process output from app-zip-code-search-box component.
		Store the AirQuality for use by the app-air-quality-results component.
	*/
	updateResults(results: AirQuality): void {
		this.results = results;
		console.log("HomeRouteComponent results:", this.results);
	}

}
