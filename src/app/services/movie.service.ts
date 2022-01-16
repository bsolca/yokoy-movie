import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Movie} from '../interfaces/movie';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private moviesUrl = 'api/movies';  // URL to web api

  constructor(private http: HttpClient) {
  }

  /** GET heroes from the server */
  getMovies(term?: string): Observable<Movie[]> {
    const params = new HttpParams({fromObject: {term}});
    return this.http.get<Movie[]>(this.moviesUrl, {params}).pipe(
      catchError(this.handleError<Movie[]>('getMovies', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new movie to the server */
  addMovie(movie: Movie): Observable<Movie> {
    movie.id = Date.now(); // Todo Better uid generation in backend
    return this.http.post<Movie>(this.moviesUrl, movie).pipe(
      catchError(this.handleError<Movie>('addMovie'))
    );
  }

  /** DELETE: delete the movie from the server */
  deleteMovie(id: number): Observable<Movie> {
    const url = `${this.moviesUrl}/${id}`;
    return this.http.delete<Movie>(url).pipe(
      catchError(this.handleError<Movie>('deleteMovie'))
    );
  }

  /** PUT: update the hero on the server */
  updateMovie(hero: Movie): Observable<any> {
    return this.http.put(this.moviesUrl, hero).pipe(
      catchError(this.handleError<any>('updateMovie'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      // Code here

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
