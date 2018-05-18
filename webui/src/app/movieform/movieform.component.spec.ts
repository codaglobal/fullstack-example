import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieformComponent } from './movieform.component';

describe('MovieformComponent', () => {
  let component: MovieformComponent;
  let fixture: ComponentFixture<MovieformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
