import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OSCDash } from './oscdash';

describe('OSCDash', () => {
  let component: OSCDash;
  let fixture: ComponentFixture<OSCDash>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OSCDash],
    }).compileComponents();

    fixture = TestBed.createComponent(OSCDash);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
