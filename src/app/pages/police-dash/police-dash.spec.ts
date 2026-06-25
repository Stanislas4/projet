import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoliceDash } from './police-dash';

describe('PoliceDash', () => {
  let component: PoliceDash;
  let fixture: ComponentFixture<PoliceDash>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PoliceDash],
    }).compileComponents();

    fixture = TestBed.createComponent(PoliceDash);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
