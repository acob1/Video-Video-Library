import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListviderScreen } from './listvider-screen';

describe('ListviderScreen', () => {
  let component: ListviderScreen;
  let fixture: ComponentFixture<ListviderScreen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListviderScreen]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListviderScreen);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
