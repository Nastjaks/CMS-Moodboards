import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleMoodboardCardComponent } from './single-moodboard-card.component';

describe('SingleMoodboardCardComponent', () => {
  let component: SingleMoodboardCardComponent;
  let fixture: ComponentFixture<SingleMoodboardCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleMoodboardCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleMoodboardCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
