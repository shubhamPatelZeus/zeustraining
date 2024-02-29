import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalkInListComponent } from './walk-in-list.component';

describe('WalkInListComponent', () => {
  let component: WalkInListComponent;
  let fixture: ComponentFixture<WalkInListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WalkInListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WalkInListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
