import { Component, OnInit, Input, OnChanges, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import Movie from '../beans/movie.bean';
import {MovieService} from '../services/movie.service';

@Component({
  selector: 'app-movieform',
  templateUrl: './movieform.component.html',
  styleUrls: ['./movieform.component.css'],
  providers: [MovieService]
})
export class MovieformComponent implements OnInit, OnChanges {
  @ViewChild('addMoviecloseBtn') addMoviecloseBtn: ElementRef;
  @Input() newMovie: Movie = new Movie();
  @Input() update: boolean;
  @Output() movieUpdated: EventEmitter<Movie> = new EventEmitter<Movie>();
  @Output() movieCreated:EventEmitter<Movie> = new EventEmitter<Movie>();

  constructor(private movieService: MovieService) { }

  ngOnInit() {
    
  }

  ngOnChanges() {

  }


  onSubmit() {
    if(this.update) {
      //update movie.
      this.movieService.updateMovie(this.newMovie).subscribe((movie: Movie) => {
        this.movieUpdated.emit(movie);
        this.newMovie = movie;
        this.addMoviecloseBtn.nativeElement.click();
      });
    } else {
      //create movie.
      this.movieService.createMovie(this.newMovie).subscribe((movie: Movie) => {
        this.movieCreated.emit(movie);
        this.newMovie = new Movie();
        this.addMoviecloseBtn.nativeElement.click();
      });
    }
  }
}
