import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsTimelineTasksComponent } from './stats-timeline-tasks.component';

describe('StatsTimelineTasksComponent', () => {
  let component: StatsTimelineTasksComponent;
  let fixture: ComponentFixture<StatsTimelineTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatsTimelineTasksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsTimelineTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
