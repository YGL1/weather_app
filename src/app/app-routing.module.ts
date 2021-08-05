import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component'
import { FavoritesComponent } from './components/favorites/favorites.component'

const routes: Routes = [
  { path: 'main', component: MainComponent },
  { path: 'main/:id', component: MainComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: '', redirectTo: '/main', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
