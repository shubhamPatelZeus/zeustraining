import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterReviewAndProceedComponent } from './register-review-and-proceed.component';

describe('RegisterReviewAndProceedComponent', () => {
  let component: RegisterReviewAndProceedComponent;
  let fixture: ComponentFixture<RegisterReviewAndProceedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterReviewAndProceedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterReviewAndProceedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
