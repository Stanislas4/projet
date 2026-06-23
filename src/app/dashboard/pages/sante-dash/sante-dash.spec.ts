import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SanteDash } from './sante-dash';

describe('SanteDash', () => {
  let component: SanteDash;
  let fixture: ComponentFixture<SanteDash>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SanteDash],
    }).compileComponents();

    fixture = TestBed.createComponent(SanteDash);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
