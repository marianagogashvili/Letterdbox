import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnListsComponent } from './own-lists.component';

describe('OwnListsComponent', () => {
  let component: OwnListsComponent;
  let fixture: ComponentFixture<OwnListsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnListsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
