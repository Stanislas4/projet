import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Justiceforms } from './justiceforms';

describe('Justiceforms', () => {
  let component: Justiceforms;
  let fixture: ComponentFixture<Justiceforms>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Justiceforms],
    }).compileComponents();

    fixture = TestBed.createComponent(Justiceforms);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
