import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { currentWeather } from '../interfaces/currentWeather';

@Injectable({
  providedIn: 'root'
})
export class CurrentWeatherService {

  constructor(private apiSevice: ApiService) { }
  currentWeathe!: currentWeather;
  getcurrentWeather(cityId:string):currentWeather {
    this.apiSevice.getCurrentWeather(cityId).subscribe
      (
        weather => {
          let w: currentWeather = { Temperature: weather[0].Temperature, WeatherText: weather[0].WeatherText, WeatherIcon: weather[0].WeatherIcon }; this.currentWeathe = w
        }
      )
      return this.currentWeathe;
  }
}
