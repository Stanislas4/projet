import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JusticeFormsComponent } from './justice-forms.component';

describe('JusticeFormsComponent', () => {
  let component: JusticeFormsComponent;
  let fixture: ComponentFixture<JusticeFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JusticeFormsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JusticeFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
