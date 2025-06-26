import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobSeekrProfileComponent } from './job-seekr-profile.component';

describe('JobSeekrProfileComponent', () => {
  let component: JobSeekrProfileComponent;
  let fixture: ComponentFixture<JobSeekrProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobSeekrProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobSeekrProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
