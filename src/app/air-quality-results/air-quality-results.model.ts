export class AirQuality {
/*
{
"zipCode":"28211",
"city":"Charlotte",
"state":"NC",
"latitude":35.227,
"longitude":-80.843,
"ozoneAQI":20,
"particulateMatterAQI":52}
*/
	zipCode: string;
	city: string;
	state: string;
	latitude: number;
	longitude: number;
	ozoneAQI: number;
	particulateMatterAQI: number;
	ozoneClass: string;
	ozoneDescription: string;
	pmClass: string;
	pmDescription: string;
	
	constructor(
	  zipCode: string,
	  city: string,
	  state: string,
	  latitude: number,
	  longitude: number,
	  ozoneAQI: number,
	  particulateMatterAQI: number){
	    this.zipCode = zipCode;
		this.city = city;
		this.state = state;
		this.latitude = latitude;
		this.longitude = longitude;
		this.ozoneAQI = ozoneAQI;
		this.particulateMatterAQI = particulateMatterAQI;
		this.ozoneClass = this.ozoneAQIClass();
		this.pmClass = this.pmAQIClass();
		this.ozoneDescription = this.ozoneAQIDescription();
		this.pmDescription = this.pmAQIDescription();
	}
	
	private getAQIClass(aqi: number) : string{
		if(aqi){
			if(aqi < 51) return 'green column padded middle aligned centered';
			if(aqi < 101) return 'yellow column padded middle aligned centered';
			if(aqi < 151) return 'orange column padded middle aligned centered';
			if(aqi < 201) return 'red column padded middle aligned centered';
			if(aqi < 301) return 'brown column padded middle aligned centered';
			if(aqi > 300) return 'black column padded middle aligned centered';
		}
		return 'grey column padded middle aligned centered';
	}

	private ozoneAQIClass() : string{
		return this.getAQIClass(this.ozoneAQI);
	}
	
	private pmAQIClass() : string{
		return this.getAQIClass(this.particulateMatterAQI);
	}
	
	private getAQIDescription(aqi: number) : string{
		if(this.ozoneAQI){
			if(aqi < 51) return 'Good';
			if(aqi < 101) return 'Moderate';
			if(aqi < 151) return 'Unhealthy for Sensitive Groups';
			if(aqi < 201) return 'Unhealthy';
			if(aqi < 301) return 'Very Unhealty';
			if(aqi > 300) return 'Hazardous';
		}
		return 'Unknown';
	}
	
	private ozoneAQIDescription() : string{
		return this.getAQIDescription(this.ozoneAQI);
	}
	
	private pmAQIDescription() : string{
		return this.getAQIDescription(this.particulateMatterAQI);
	}
	
}