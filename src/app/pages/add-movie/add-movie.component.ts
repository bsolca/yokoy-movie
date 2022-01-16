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
          {label: 'Iron Man', value: 'iron_man'},
          {label: 'Captain America', value: 'captain_america'},
          {label: 'Black Widow', value: 'black_widow'},
          {label: 'Hulk', value: 'hulk'},
          {label: 'Captain Marvel', value: 'captain_marvel'},
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
    console.log('Add movie', movie);
    this.movieService.addMovie(movie).subscribe(
      res => {
        console.log(res);
        this.movieService.getMovies().subscribe((e) => console.log('3:', e));
      },
      err => {
        console.log(err);
      },
    );
    this.back();
  }
}
