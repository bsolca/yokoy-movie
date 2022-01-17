import {Injectable} from '@angular/core';
import {getStatusText, InMemoryDbService, RequestInfo, ResponseOptions, STATUS} from 'angular-in-memory-web-api';
import {Movie} from '../interfaces/movie';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  movies: Movie[] = [
    {
      id: 1,
      name: 'The Last Samurai',
      actor: 'Tom Cruise',
      rate: 10,
      year: 2004,
    },
    {
      id: 2,
      name: 'The Matrix',
      actor: 'Keanu Reeves',
      rate: 9,
      year: 1999,
    },
    {
      id: 3,
      name: 'The Intouchables',
      actor: 'Omar Sy',
      rate: 8,
      year: 2011,
    },
    {
      id: 4,
      name: 'Dune',
      actor: 'Zendaya',
      rate: 8,
      year: 2021,
    },
    {
      id: 5,
      name: 'The Butterfly Effect',
      actor: 'Ashton Kutcher\n',
      rate: 10,
      year: 2004,
    },

  ];

  createDb() {
    return {
      movies: this.movies
    };
  }

  // HTTP GET interceptor
  get(reqInfo: RequestInfo) {
    const collectionName = reqInfo.collectionName;
    if (collectionName === 'movies') {
      return this.getMovies(reqInfo);
    }
    return undefined; // let the default GET handle all others
  }

  private getMovies(reqInfo: RequestInfo) {
    return reqInfo.utils.createResponse$(() => {

      const collection = this.movies.slice();
      const dataEncapsulation = reqInfo.utils.getConfig().dataEncapsulation;

      const data = reqInfo.query.size === 0
        ? collection
        : collection.filter((m) => {
          const name = m.name?.toLowerCase();
          const actor = m.actor?.toLowerCase();
          const term = reqInfo.query.get('term')[0]?.toLowerCase();
          return name.includes(term) || actor.includes(term);
        });

      const options: ResponseOptions = data ?
        {
          body: dataEncapsulation ? {data} : data,
          status: STATUS.OK
        } :
        {
          body: {error: 'Movies not found'},
          status: STATUS.NOT_FOUND
        };
      return this.finishOptions(options, reqInfo);
    });
  }

  /////////// helpers ///////////////

  private finishOptions(options: ResponseOptions, {headers, url}: RequestInfo) {
    options.statusText = getStatusText(options.status);
    options.headers = headers;
    options.url = url;
    return options;
  }
}
