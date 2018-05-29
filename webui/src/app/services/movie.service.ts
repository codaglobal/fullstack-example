import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, catchError } from 'rxjs/operators';
import { AppConfig } from '../app.config';
import Movie from '../beans/movie.bean';

@Injectable()
export class MovieService {
    public config: any;
    constructor(private http: Http, private _config: AppConfig) {
        this.config = _config.getConfig();
    }

    setHeaders(){
        let header = new Headers();
        // let idToken = this.cookieService.get('id-token');
        // header.append('Authorization', idToken);
        return header;
    }

    getMovies(): Observable<Movie[]> {
        return this.http.get(this.config.serviceUrls.base + this.config.serviceUrls.movies, { headers: this.setHeaders()})
            .pipe(
                map((res: Response) => res.json()),
                catchError(() => of({ 'error': 'Service call failed' }))
            );
    }

    getMovieDetails(id): Observable<Movie> {
        return this.http.get(this.config.serviceUrls.base + this.config.serviceUrls.getMovie(id), {headers: this.setHeaders()})
        .pipe(
            map((res: Response) => res.json()),
            catchError(() => of({'error' : 'Service call failed'}))
        );
    }
    deleteMovie(id): Observable<Movie> {
        return this.http.delete(this.config.serviceUrls.base + this.config.serviceUrls.deleteMovie(id), {headers: this.setHeaders()})
        .pipe(
            map((res: Response) => res.json()),
            catchError(() => of({'error' : 'Service call failed'}))
        );
    }

    createMovie(movie: Movie): Observable<Movie> {
        return this.http.post(this.config.serviceUrls.base + this.config.serviceUrls.movies, movie, {headers: this.setHeaders()})
        .pipe(
            map((res: Response) => res.json()),
            catchError(() => of({'error' : 'Service call failed'}))
        );
    }

    updateMovie(movie: Movie): Observable<Movie> {
        return this.http.put(this.config.serviceUrls.base + this.config.serviceUrls.updateMovie(movie._id), movie, {headers: this.setHeaders()})
        .pipe(
            map((res: Response) => res.json()),
            catchError(() => of({'error' : 'Service call failed'}))
        );
    }
}
