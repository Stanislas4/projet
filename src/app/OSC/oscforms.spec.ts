import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Oscforms } from './oscforms';

describe('Oscforms', () => {
  let component: Oscforms;
  let fixture: ComponentFixture<Oscforms>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Oscforms],
    }).compileComponents();

    fixture = TestBed.createComponent(Oscforms);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
