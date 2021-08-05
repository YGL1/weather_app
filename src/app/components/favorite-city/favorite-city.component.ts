import { Component, OnInit, Input } from '@angular/core';
import { City } from '../../interfaces/city';
import { imperial, metric, temperatureCurrentWeather } from 'src/app/interfaces/currentWeatherApi';
import { currentWeather } from 'src/app/interfaces/currentWeather';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'favorite-city',
  templateUrl: './favorite-city.component.html',
  styleUrls: ['./favorite-city.component.css']
})
export class FavoriteCityComponent implements OnInit {
  @Input() city!: City;
  constructor(private apiSevice:ApiService) { }
  imperial: imperial = { Unit: 'c', UnitType: 45, Value: 3 };
  metric: metric = { Unit: 'c', UnitType: 45, Value: 3 };
  tempCurrentWeather: temperatureCurrentWeather = { Imperial: this.imperial, Metric: this.metric }
  currentWeathe: currentWeather = { WeatherIcon: 1, WeatherText: 'cloudy', Temperature: this.tempCurrentWeather };

  ngOnInit(): void {
    //this.getcurrentWeather();
  }


  getcurrentWeather() {
    this.apiSevice.getCurrentWeather(this.city.id).subscribe
      (
        weather => {
          console.log("this is the weather today: " + weather[0].WeatherText)
          let w: currentWeather = { Temperature: weather[0].Temperature, WeatherText: weather[0].WeatherText, WeatherIcon: weather[0].WeatherIcon }; this.currentWeathe = w
        }
      )
  }

}
