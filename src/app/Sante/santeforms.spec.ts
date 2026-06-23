import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Santeforms } from './santeforms';

describe('Santeforms', () => {
  let component: Santeforms;
  let fixture: ComponentFixture<Santeforms>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Santeforms],
    }).compileComponents();

    fixture = TestBed.createComponent(Santeforms);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
