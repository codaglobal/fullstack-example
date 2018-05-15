import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {MovieService} from '../services/movie.service';
import Movie from '../beans/movie.bean';
import {Router} from '@angular/router';
import * as _ from 'lodash';
import {NgForm} from '@angular/forms';



@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [MovieService]
})
export class DashboardComponent implements OnInit {
  @ViewChild('deleteMovieModalCloseBtn') deleteMovieModalCloseBtn: ElementRef;
  title = 'dashboard';
  movies: Movie[];
  newMovie: Movie = new Movie();
  createMovie:boolean = false;
  submitted = false;
  showMovie:boolean = false;
  currentMovie:Movie = new Movie();
  constructor(private movieService: MovieService, private _router: Router) {
  }

  ngOnInit() {
    this.getAllMovies(); 
  }

  getAllMovies() {
    this.movieService.getMovies().subscribe((movies: Movie[]) => {
      this.movies = movies;
    });
  }

  nativagetToMoviePage(movieId) {
    this._router.navigate(['/movie', movieId]);
  }


  movieCreated(movie:Movie) {
    this.movies.push(movie);
  }

  movieUpdated(movie: Movie) {
    console.log('movie updated');
  }

  showModal(movie:Movie) {
    this.currentMovie = movie;
  }

  deleteMovie() {
    this.movieService.deleteMovie(this.currentMovie._id).subscribe((data: any) => {
      //show deleted modal.
      this.getAllMovies();
      this.deleteMovieModalCloseBtn.nativeElement.click();
    });
  }
}
