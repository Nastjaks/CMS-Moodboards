import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoodboardCreateDialogComponent } from './moodboard-create-dialog.component';

describe('MoodboardCreateDialogComponent', () => {
  let component: MoodboardCreateDialogComponent;
  let fixture: ComponentFixture<MoodboardCreateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoodboardCreateDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoodboardCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
