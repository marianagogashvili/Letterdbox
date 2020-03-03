import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchedFilmsComponent } from './watched-films.component';

describe('WatchedFilmsComponent', () => {
  let component: WatchedFilmsComponent;
  let fixture: ComponentFixture<WatchedFilmsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WatchedFilmsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WatchedFilmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
