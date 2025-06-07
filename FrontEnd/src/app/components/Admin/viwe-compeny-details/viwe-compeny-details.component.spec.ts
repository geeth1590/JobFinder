import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViweCompenyDetailsComponent } from './viwe-compeny-details.component';

describe('ViweCompenyDetailsComponent', () => {
  let component: ViweCompenyDetailsComponent;
  let fixture: ComponentFixture<ViweCompenyDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViweCompenyDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViweCompenyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
