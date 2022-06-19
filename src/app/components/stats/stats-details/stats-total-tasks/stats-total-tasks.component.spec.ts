import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsTotalTasksComponent } from './stats-total-tasks.component';

describe('StatsTotalTasksComponent', () => {
  let component: StatsTotalTasksComponent;
  let fixture: ComponentFixture<StatsTotalTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatsTotalTasksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsTotalTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
