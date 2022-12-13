import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostingsOverviewComponent } from './postings-overview.component';

describe('PostingsOverviewComponent', () => {
  let component: PostingsOverviewComponent;
  let fixture: ComponentFixture<PostingsOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostingsOverviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostingsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
