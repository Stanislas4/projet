import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Policeforms } from './policeforms';

describe('Policeforms', () => {
  let component: Policeforms;
  let fixture: ComponentFixture<Policeforms>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Policeforms],
    }).compileComponents();

    fixture = TestBed.createComponent(Policeforms);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
