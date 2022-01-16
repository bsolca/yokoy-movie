import {Component, OnInit} from '@angular/core';
import {Movie} from '../../interfaces/movie';
import {MovieService} from '../../services/movie.service';
import {ActivatedRoute} from '@angular/router';
import {Observable, Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, startWith, switchMap} from 'rxjs/operators';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  movies$!: Observable<Movie[]>;
  isModalOpen = false;
  currentMovie: Movie | null = null;
  private searchTerms = new Subject<string>();

  constructor(
    private movieService: MovieService,
    route: ActivatedRoute,
    private modalController: ModalController,
    ) {
    route.params.subscribe((_) => this.getMovies());
  }

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit() {
    this.getMovies();
  }

  toggleModal = (isModalOpen: boolean, movie: Movie) => {
    this.currentMovie = movie;
    this.isModalOpen = isModalOpen;
  };

  getMovies(): void {
    this.movieService.getMovies('').subscribe((movies) => {
      this.movies$ = this.searchTerms.pipe(
        // wait 300ms after each keystroke before considering the term
        debounceTime(300),

        // ignore new term if same as previous term
        distinctUntilChanged(),

        // switch to new search observable each time the term changes
        switchMap((term: string) => this.movieService.getMovies(term)),

        startWith(movies)
      );
    });
  }

  rateMovie(movie: Movie, rating: number): void {
    movie.rate = rating;
    this.movieService.updateMovie(movie).subscribe((m) => {
      this.getMovies();
    });
    this.toggleModal(false, null);
  }
}
