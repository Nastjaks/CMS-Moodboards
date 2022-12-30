import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoodboardDetailComponent } from './moodboard-detail.component';

describe('MoodboardDetailComponent', () => {
  let component: MoodboardDetailComponent;
  let fixture: ComponentFixture<MoodboardDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoodboardDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoodboardDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
