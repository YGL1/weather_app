// import { Injectable } from '@angular/core';
// import { City } from '../city';
// import { Observable, of } from 'rxjs';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { catchError, map, tap } from 'rxjs/operators';
// @Injectable({
//   providedIn: 'root'
// })
// export class favoriteService {
//   private favoritesUrl = 'api/favoriteCities'; 
//   httpOptions = {
//     headers: new HttpHeaders({ 'Content-Type': 'application/json' })
//   };
//   constructor(private http: HttpClient, ) { }
//   getfavoriteCities(): Observable<City[]> {
//     return this.http.get<City[]>(this.favoritesUrl);
//   }
//   /** GET favorite by id. Return `undefined` when id not found */
//   getfavoriteCityNo404<Data>(id: number): Observable<City> {
//     const url = `${this.favoritesUrl}/?id=${id}`;
//     return this.http.get<City[]>(url)
//       .pipe(map(favoritees => favoritees[0]), // returns a {0|1} element array
//         tap(h => {
//           const outcome = h ? `fetched` : `did not find`;
         
//         }), catchError(this.handleError<City>(`getfavorite id=${id}`)));
//   }
//   /** GET favorite by id. Will 404 if id not found */
//   getfavorite(id: number): Observable<City> {
//     const url = `${this.favoritesUrl}/${id}`;
//     return this.http.get<City>(url);
//   }
//   /* GET favoritees whose name contains search term */
//   searchfavoriteCity(term: string): Observable<City[]> {
//     if (!term.trim()) {
//       // if not search term, return empty favorite array.
//       return of([]);
//     }
//     return this.http.get<City[]>(`${this.favoritesUrl}/?name=${term}`);
//   }
//   /** POST: add a new favorite to the server */
//   addfavorite(favorite: City): Observable<City> {
//     return this.http.post<City>(this.favoritesUrl, favorite, this.httpOptions)}
//   /** DELETE: delete the favorite from the server */
//   deletefavorite(favorite: City | number): Observable<City> {
//     const id = typeof favorite === 'number' ? favorite : favorite.id;
//     const url = `${this.favoritesUrl}/${id}`;
//     return this.http.delete<City>(url, this.httpOptions);
//   }
 
//   /**
//  * Handle Http operation that failed.
//  * Let the app continue.
//  * @param operation - name of the operation that failed
//  * @param result - optional value to return as the observable result
//  */
//   private handleError<T>(operation = 'operation', result?: T) {
//     return (error: any): Observable<T> => {
//       // TODO: send the error to remote logging infrastructure
//       console.error(error); // log to console instead
//       // TODO: better job of transforming error for user consumption
//       // Let the app keep running by returning an empty result.
//       return of(result as T);
//     };
//   }
// }
