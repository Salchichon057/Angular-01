import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Movie } from '../interfaces/movie';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private url = environment.url;
  
  constructor( private http: HttpClient ) { }

  getMovies() {
    return this.http.get(`${this.url}/movies`);
  }

  getMovie( id: string ) {
    return this.http.get(`${this.url}/movies/${id}`);
  }

  createMovie( movie: Movie ) {
    return this.http.post(`${this.url}/movies`, movie);
  }

  updateMovie( id: string, movie: Movie ) {
    return this.http.put(`${this.url}/movies/${id}`, movie);
  }
  
  deleteMovie( id: string ) {
    return this.http.delete(`${this.url}/movies/${id}`);
  }
}
