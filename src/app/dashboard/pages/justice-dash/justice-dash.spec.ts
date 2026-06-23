import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JusticeDash } from './justice-dash';

describe('JusticeDash', () => {
  let component: JusticeDash;
  let fixture: ComponentFixture<JusticeDash>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JusticeDash],
    }).compileComponents();

    fixture = TestBed.createComponent(JusticeDash);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
