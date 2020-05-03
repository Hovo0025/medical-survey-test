import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondFourComponent } from './second-four.component';

describe('SecondFourComponent', () => {
  let component: SecondFourComponent;
  let fixture: ComponentFixture<SecondFourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecondFourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecondFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
