import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobREquestComponent } from './job-request.component';

describe('JobREquestComponent', () => {
  let component: JobREquestComponent;
  let fixture: ComponentFixture<JobREquestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobREquestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobREquestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
