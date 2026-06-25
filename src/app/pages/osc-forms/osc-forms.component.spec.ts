import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OscFormsComponent } from './osc-forms.component';

describe('OscFormsComponent', () => {
  let component: OscFormsComponent;
  let fixture: ComponentFixture<OscFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OscFormsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OscFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
