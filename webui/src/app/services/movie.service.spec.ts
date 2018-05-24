import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';

import { MovieService } from './movie.service';
import {AppConfig} from '../app.config';

describe('MovieService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [
            HttpModule
        ],
      providers: [MovieService, AppConfig]
    });
  });

  it('should be created', inject([MovieService], (service: MovieService) => {
    expect(service).toBeTruthy();
  }));
});
