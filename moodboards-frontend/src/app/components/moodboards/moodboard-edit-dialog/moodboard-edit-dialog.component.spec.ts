import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoodboardEditDialogComponent } from './moodboard-edit-dialog.component';

describe('MoodboardEditDialogComponent', () => {
  let component: MoodboardEditDialogComponent;
  let fixture: ComponentFixture<MoodboardEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoodboardEditDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoodboardEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
