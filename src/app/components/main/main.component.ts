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
  city: City | undefined;
  cities: City[] = [];



  ////exapmle-withOutApi    
  max: maximum = { Value: 0, Unit: 'c', UnitType: 12 }
  min: minimum = { Value: 0, Unit: 'c', UnitType: 12 }
  temp: temperature = { Maximum: this.max, Minimum: this.min }
  day: dailyForecast = { name: '2021-10-03T08:00:00+02:00', temperature: this.temp };
  ////end



////exapmle-withOutApi    
  imperial: imperial = { Unit: 'c', UnitType: 45, Value: 3 };
  metric: metric = { Unit: 'c', UnitType: 45, Value: 3 };
  tempCurrentWeather: temperatureCurrentWeather = { Imperial: this.imperial, Metric: this.metric }
  currentWeathe: currentWeather = { WeatherIcon: 1, WeatherText: 'cloudy', Temperature: this.tempCurrentWeather };
  ////#end

  days: dailyForecast[] = [this.day, this.day, this.day, this.day, this.day];

  searchControl: FormControl = new FormControl('tel aviv', Validators.pattern("[a-zA-Z -]*"));


  ngOnInit(): void {
    this.initCity();
    this.searchControl.valueChanges.subscribe(v => { if (v.length > 1) { this.getCitiesAutoComplete(v); this.getCityFromCities(); }});

    this.get5DaysWeaterForcast()
    this.getcurrentWeather();

    this.searchControl.valueChanges.subscribe(v => console.log(this.searchControl.valid))

  }


  initCity() {
    const cityId = (<string>this.route.snapshot.paramMap.get('id'));
    if (this.favoriteCityServise.isFavorite(cityId)) {
      console.log("favorited!!!");
      this.city = this.favoriteCityServise.getfavoriteCity(cityId);
    }
    else {
      this.getCitiesAutoComplete(this.searchControl.value);
      this.getCityFromCities();
    }
    console.log(this.city);

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
    this.apiSevice.getLocationAutocomlete(location).subscribe(
      location => location.forEach(i => {
        let c: City =
        {
          id: i.Key, name: i.LocalizedName
        };
        this.cities.push(c)
      }
      )
    )
  }
  getCityFromCities() {
    this.getCitiesAutoComplete(this.searchControl.value);
    let city: City = { id: '0', name: 'bhughui' };
    this.city=city;
    this.cities.forEach((c) => {
      console.log(c.name === <string>(this.searchControl.value));
      if (c.name === <string>(this.searchControl.value)) { city = c; console.log(city) }
      this.city = city;
    })
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
            console.log("this is the weather today: " + weather[0].WeatherText)
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
