import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import '../interfaces/locationAutoComplete'
import {locationAutocomplete} from '../interfaces/locationAutoComplete';
import{fiveDaysForecast} from '../interfaces/fiveDaysForecast';
import { Observable } from 'rxjs';
import { currentWeatherApi } from '../interfaces/currentWeatherApi';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private locationHowToCompletUrl = "http://dataservice.accuweather.com/locations/v1/cities/autocomplete"
  private fiveDaysDailyForecastsUrl = "http://dataservice.accuweather.com/forecasts/v1/daily/5day/"
  private currentWeatherUrl = "http://dataservice.accuweather.com/currentconditions/v1/"
  constructor(private http: HttpClient) {


  }
  getLocationAutocomlete(city: string): Observable<locationAutocomplete[]> {
    let params = new HttpParams().set("apikey", "		XRIHMR74K4iobUY9KpqO6URt2Eb3z7Uo ").set("q", city);
    return this.http.get<locationAutocomplete[]>(this.locationHowToCompletUrl,{ params:params})
  }
  get5DaysDailyForecast(cityId:string|undefined):Observable<fiveDaysForecast>
  { if (cityId == undefined) {
    //todo: console.error();
  }
    let params = new HttpParams().set("apikey", "	XRIHMR74K4iobUY9KpqO6URt2Eb3z7Uo ");
    return this.http.get<fiveDaysForecast>(this.fiveDaysDailyForecastsUrl+cityId,{ params:params})
  }
  getCurrentWeather(cityId:string|undefined):Observable<currentWeatherApi[]>
  {
    if (cityId == undefined) {
      //todo: console.error();
    }
    let params = new HttpParams().set("apikey", "		XRIHMR74K4iobUY9KpqO6URt2Eb3z7Uo ");
    return this.http.get<currentWeatherApi[]>(this.currentWeatherUrl+cityId,{ params:params})
  }
}
