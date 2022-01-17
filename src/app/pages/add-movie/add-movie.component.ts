import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormlyFieldConfig, FormlyFormOptions} from '@ngx-formly/core';
import {Movie} from '../../interfaces/movie';
import {MovieService} from '../../services/movie.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.scss'],
})
export class AddMovieComponent implements OnInit {
  form = new FormGroup({});
  model: Movie = {actor: null, id: null, name: null, rate: 5, year: 2022};
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = [
    {
      key: 'name',
      type: 'input',
      templateOptions: {
        label: 'Movie Name',
        placeholder: 'Movie name',
        required: true,
      },
    },
    {
      key: 'year',
      type: 'number',
      templateOptions: {
        label: 'Year',
        placeholder: 'Movie year',
        required: true,
      },
    },
    {
      key: 'actor',
      type: 'select',
      templateOptions: {
        label: 'Actor',
        required: true,
        options: [
          {label: 'Tom Cruise', value: 'Tom Cruise'},
          {label: 'Keanu Reeves', value: 'Keanu Reeves'},
          {label: 'Omar Sy', value: 'Omar Sy'},
          {label: 'Zendaya', value: 'Zendaya'},
          {label: 'Ashton Kutcher', value: 'Ashton Kutcher'},
        ]
      },
    },
    {
      key: 'rate',
      type: 'number',
      templateOptions: {
        label: 'Rate',
        min: 1,
        max: 10,
      },
    },
  ];

  constructor(private movieService: MovieService, private router: Router) {
  }

  ngOnInit() {
  }

  back = () => this.router.navigate(['..'], {});

  onSubmit(movie: Movie) {
    if (!movie.rate || !movie.name || !movie.year || !movie.actor) {return;}
    this.movieService.addMovie(movie).subscribe((_) => this.movieService.getMovies());
    this.back();
  }
}
