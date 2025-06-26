import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenarateReportComponent } from './genarate-report.component';

describe('GenarateReportComponent', () => {
  let component: GenarateReportComponent;
  let fixture: ComponentFixture<GenarateReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenarateReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenarateReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
