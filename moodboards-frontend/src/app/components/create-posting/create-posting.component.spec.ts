import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePostingComponent } from './create-posting.component';

describe('CreatePostingComponent', () => {
  let component: CreatePostingComponent;
  let fixture: ComponentFixture<CreatePostingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePostingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePostingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
