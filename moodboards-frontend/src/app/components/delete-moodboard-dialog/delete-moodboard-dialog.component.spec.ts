import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteMoodboardDialogComponent } from './delete-moodboard-dialog.component';

describe('DeleteMoodboardDialogComponent', () => {
  let component: DeleteMoodboardDialogComponent;
  let fixture: ComponentFixture<DeleteMoodboardDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteMoodboardDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteMoodboardDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
