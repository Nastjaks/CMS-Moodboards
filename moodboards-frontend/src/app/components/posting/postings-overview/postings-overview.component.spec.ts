import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostingsOverviewComponent } from './postings-overview.component';

// @ts-ignore
describe('PostingsOverviewComponent', () => {
  let component: PostingsOverviewComponent;
  let fixture: ComponentFixture<PostingsOverviewComponent>;
// @ts-ignore
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostingsOverviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostingsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
// @ts-ignore
  it('should create', () => {
    // @ts-ignore
    expect(component).toBeTruthy();
  });
});
