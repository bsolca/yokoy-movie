import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';
import {InMemoryDataService} from './services/in-memory-data.service';
import {HomeComponent} from './pages/home/home.component';
import {HttpClientModule} from '@angular/common/http';
import {MovieSearchComponent} from './components/movie-search/movie-search.component';
import {FormlyFieldConfig, FormlyModule} from '@ngx-formly/core';
import {ReactiveFormsModule} from '@angular/forms';
import {FormlyIonicModule} from '@ngx-formly/ionic';
import {AddMovieComponent} from './pages/add-movie/add-movie.component';

export const minValidationMessage = (err, field: FormlyFieldConfig) => `should be >= ${field.templateOptions.min}`;

export const maxValidationMessage = (err, field: FormlyFieldConfig) => `should be <= ${field.templateOptions.max}`;

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MovieSearchComponent,
    AddMovieComponent,
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, {dataEncapsulation: false},
    ),
    FormlyModule.forRoot({
      extras: { resetFieldOnHide: true },
      validationMessages: [
        {name: 'required', message: 'This field is required'},
        {name: 'min', message: minValidationMessage},
        {name: 'max', message: maxValidationMessage},
      ],
    }),
    ReactiveFormsModule,
    FormlyIonicModule,
  ],
  providers: [{provide: RouteReuseStrategy, useClass: IonicRouteStrategy}],
  bootstrap: [AppComponent],
})
export class AppModule {
}
