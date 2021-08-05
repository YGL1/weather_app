import { Injectable } from '@angular/core';
import { City } from '../interfaces/city'

@Injectable({
  providedIn: 'root'
})
export class FavoriteCitiesService {

  favoriteCities: City[] = [];
  constructor() { }

  getfavoriteCities(): City[] {
    var favoriteCities = "" + localStorage.getItem('favoriteCities');
    return <City[]>JSON.parse(favoriteCities)
  }
  getfavoriteCity(id: string): City {
    let city: City = { id: '0', name: '' };
    this.favoriteCities = this.getfavoriteCities();
    let jsonObj = this.favoriteCities.filter(x => x.id === id)[0];
    city = <City>jsonObj;
    return city;
  }

  addfavoriteCity(favoriteCity: City) {
    if (!this.isFavorite(favoriteCity.id)) {
      this.favoriteCities = this.getfavoriteCities();
      if (this.favoriteCities == null) {
        this.favoriteCities = [favoriteCity]
      }
      else
        this.favoriteCities.push(favoriteCity);
      localStorage.setItem("favoriteCities", JSON.stringify(this.favoriteCities));
    }
  }


  deletefavoriteCity(favoriteCityId: string) {
    if (this.isFavorite(favoriteCityId)) {

      this.favoriteCities = this.getfavoriteCities();
      let index: number = this.favoriteCities.indexOf(this.favoriteCities.filter(c => c.id === favoriteCityId)[0]);
      console.log(index)
      if (index > -1) {
        this.favoriteCities.splice(index, 1);
        localStorage.setItem("favoriteCities", JSON.stringify(this.favoriteCities));
      }

    }
  }



  isFavorite(id: string): boolean {
    this.favoriteCities = this.getfavoriteCities();

    if (this.favoriteCities == null || this.favoriteCities.length < 1) { return false; }
    return this.favoriteCities.filter(x => x.id === id) != null && this.favoriteCities.filter(x => x.id === id).length > 0;
  }


}
