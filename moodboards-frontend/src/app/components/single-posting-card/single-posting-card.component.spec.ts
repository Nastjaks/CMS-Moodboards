import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglePostingCardComponent } from './single-posting-card.component';

describe('SinglePostingCardComponent', () => {
  let component: SinglePostingCardComponent;
  let fixture: ComponentFixture<SinglePostingCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SinglePostingCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SinglePostingCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
