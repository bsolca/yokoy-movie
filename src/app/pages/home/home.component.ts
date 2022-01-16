import { Component, OnInit } from '@angular/core';
import {Movie} from '../../interfaces/movie';
import {MovieService} from '../../services/movie.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  movies: Movie[] = [];

  constructor(private movieService: MovieService, route: ActivatedRoute) {
    route.params.subscribe((_) => this.getMovies());
  }

  ngOnInit() {
    this.getMovies();
  }

  getMovies(): void {
    this.movieService.getMovies().subscribe(movies => {
      console.log('Update movie sub');
      this.movies = movies;
    });
  }

  rateMovie(movie: Movie, rating: number): void {
    const indexOf = this.movies.indexOf(movie);
    movie.rate = rating;
    this.movieService.updateMovie(movie).subscribe((m) => {
      this.movies[indexOf].rate = rating;
    });
  }

}
