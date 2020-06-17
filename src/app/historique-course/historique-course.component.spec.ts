import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriqueCourseComponent } from './historique-course.component';

describe('HistoriqueCourseComponent', () => {
  let component: HistoriqueCourseComponent;
  let fixture: ComponentFixture<HistoriqueCourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoriqueCourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoriqueCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
