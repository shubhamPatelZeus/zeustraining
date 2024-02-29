import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterPersonalInformationComponent } from './register-personal-information.component';

describe('RegisterPersonalInformationComponent', () => {
  let component: RegisterPersonalInformationComponent;
  let fixture: ComponentFixture<RegisterPersonalInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterPersonalInformationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterPersonalInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
