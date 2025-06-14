import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompenyDashboardComponent } from './compeny-dashboard.component';

describe('CompenyDashboardComponent', () => {
  let component: CompenyDashboardComponent;
  let fixture: ComponentFixture<CompenyDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompenyDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompenyDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
