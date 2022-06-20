import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsHoursProjectsComponent } from './stats-hours-projects.component';

describe('StatsHoursProjectsComponent', () => {
  let component: StatsHoursProjectsComponent;
  let fixture: ComponentFixture<StatsHoursProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatsHoursProjectsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsHoursProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
