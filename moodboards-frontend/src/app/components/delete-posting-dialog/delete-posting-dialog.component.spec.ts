import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePostingDialogComponent } from './delete-posting-dialog.component';

describe('DeletePostingDialogComponent', () => {
  let component: DeletePostingDialogComponent;
  let fixture: ComponentFixture<DeletePostingDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletePostingDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeletePostingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
