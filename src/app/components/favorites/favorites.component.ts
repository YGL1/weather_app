import { Component, OnInit } from '@angular/core';
import { City } from '../../interfaces/city'
import { FavoriteCitiesService } from 'src/app/services/favorite-cities.service';

@Component({
  selector: 'favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  favoriteCities: City[] | undefined;
  constructor(private favoriteCityServise: FavoriteCitiesService) { }
  getFavoriteCities() 
  {
   this.favoriteCities=this.favoriteCityServise.getfavoriteCities();
  };


    ngOnInit(): void {
      this.getFavoriteCities();

    }

  }
