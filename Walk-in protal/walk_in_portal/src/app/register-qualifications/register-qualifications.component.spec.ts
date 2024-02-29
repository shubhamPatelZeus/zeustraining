import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterQualificationsComponent } from './register-qualifications.component';

describe('RegisterQualificationsComponent', () => {
  let component: RegisterQualificationsComponent;
  let fixture: ComponentFixture<RegisterQualificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterQualificationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterQualificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
