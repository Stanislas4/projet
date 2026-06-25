import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SanteFormsComponent } from './sante-forms.component';

describe('SanteFormsComponent', () => {
  let component: SanteFormsComponent;
  let fixture: ComponentFixture<SanteFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SanteFormsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SanteFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
