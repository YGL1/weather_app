import { Component, OnInit, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { City } from '../../interfaces/city';
import { FavoriteCitiesService } from 'src/app/services/favorite-cities.service';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { dailyForecast } from 'src/app/interfaces/dailyForecast';
import { maximum, minimum, temperature } from 'src/app/interfaces/helpinterfaces';
import { currentWeather } from 'src/app/interfaces/currentWeather';
import { temperatureCurrentWeather, imperial, metric } from 'src/app/interfaces/currentWeatherApi';
import { CurrentWeatherService } from 'src/app/services/current-weather.service';





@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private favoriteCityServise: FavoriteCitiesService, private apiSevice: ApiService, private route: ActivatedRoute, private currentWeatheService: CurrentWeatherService) { }
  @Input()
  city: City={id:"1", name:"Tel Aviv"};
  current:City ={id:"1",name:"Tel Aviv"};
  cities: City[] = [];



  ////exapmle-withOutApi    
  max: maximum = { Value: 0, Unit: 'c', UnitType: 12 }
  min: minimum = { Value: 0, Unit: 'c', UnitType: 12 }
  temp: temperature = { Maximum: this.max, Minimum: this.min }
  day: dailyForecast = { name: '2021-10-03T08:00:00+02:00', temperature: this.temp };
  ////end



  ////exapmle-withOutApi    
  imperial: imperial = { Unit: 'c', UnitType: 45, Value: 30 };
  metric: metric = { Unit: 'c', UnitType: 45, Value: 30 };
  tempCurrentWeather: temperatureCurrentWeather = { Imperial: this.imperial, Metric: this.metric }
  currentWeathe: currentWeather = { WeatherIcon: 1, WeatherText: 'cloudy', Temperature: this.tempCurrentWeather };
  ////#end

  days: dailyForecast[] = [this.day, this.day, this.day, this.day, this.day];

  searchControl: FormControl = new FormControl('tel aviv', Validators.pattern("[a-zA-Z -]*"));


  ngOnInit(): void {
    // this.initCity();
    // this.searchControl.valueChanges.subscribe(v => { if (v.length > 3) { this.getCitiesAutoComplete(v); this.getCityFromCities(); } });

    // this.get5DaysWeaterForcast()
    // this.getcurrentWeather();

    this.searchControl.valueChanges.subscribe(v => console.log(this.searchControl.valid))

  }


  initCity() {
    const cityId = (<string>this.route.snapshot.paramMap.get('id'));
    if (this.favoriteCityServise.isFavorite(cityId)) {
      console.log("favorited!!!");
      this.city = this.favoriteCityServise.getfavoriteCity(cityId);
    }
    else {  
      console.log("not favorited!!!");
      this.getCitiesAutoComplete("Tel Aviv");
      this.getCityFromCities();
    }
  }


  addFavoriteCity() {
    if (this.city != undefined) {
      console.log(this.city);
      this.favoriteCityServise.addfavoriteCity(this.city)
    }
  }
  deleteFavoriteCity() {
    if (this.city != undefined)
      this.favoriteCityServise.deletefavoriteCity(this.city.id)
  }

  getCitiesAutoComplete(location: string) {
    this.cities = [];
    this.apiSevice.getLocationAutocomlete(location).subscribe
      (
        location => {
          location.forEach
          (i => {
            let c: City =
            {
              id: i.Key, name: i.LocalizedName
            };
            this.cities.push(c)
            console.log()
            this.current = c;
            console.log("current: " + this.current.id)
          }
          )
        
        }
      )

  }
  getCityFromCities() {
    this.city = this.current;
    if(this.city!=undefined)
    console.log("city-id: " + this.city.id)
  }

  get5DaysWeaterForcast() {
    this.days = [];
    if (this.city != undefined)
      this.apiSevice.get5DaysDailyForecast(this.city.id).subscribe(
        forecast => forecast.DailyForecasts.forEach(dayForecast => {
          let day: dailyForecast =
          {
            name: dayForecast.Date, temperature: dayForecast.Temperature
          };
          this.days.push(day)
        }
        )
      )
  }

  getcurrentWeather() {
    if (this.city != undefined)
      this.apiSevice.getCurrentWeather(this.city.id).subscribe
        (
          weather => {
            let w: currentWeather = { Temperature: weather[0].Temperature, WeatherText: weather[0].WeatherText, WeatherIcon: weather[0].WeatherIcon }; this.currentWeathe = w
          }
        )
  }

  isFavoriteCity() {
    if (this.city == undefined)
      return false;
    return this.favoriteCityServise.isFavorite(this.city.id);
  }
}
