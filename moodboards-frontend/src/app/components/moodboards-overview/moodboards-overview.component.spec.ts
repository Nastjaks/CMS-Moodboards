import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoodboardsOverviewComponent } from './moodboards-overview.component';

describe('MoodboardsOverviewComponent', () => {
  let component: MoodboardsOverviewComponent;
  let fixture: ComponentFixture<MoodboardsOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoodboardsOverviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoodboardsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
