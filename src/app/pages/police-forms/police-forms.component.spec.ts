import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoliceFormsComponent } from './police-forms.component';

describe('PoliceFormsComponent', () => {
  let component: PoliceFormsComponent;
  let fixture: ComponentFixture<PoliceFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PoliceFormsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PoliceFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
