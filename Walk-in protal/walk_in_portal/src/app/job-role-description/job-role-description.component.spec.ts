import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobRoleDescriptionComponent } from './job-role-description.component';

describe('JobRoleDescriptionComponent', () => {
  let component: JobRoleDescriptionComponent;
  let fixture: ComponentFixture<JobRoleDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JobRoleDescriptionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JobRoleDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
