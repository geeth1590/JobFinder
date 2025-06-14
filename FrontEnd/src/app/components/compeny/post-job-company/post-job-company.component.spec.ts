import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostJobCompanyComponent } from './post-job-company.component';

describe('PostJobCompanyComponent', () => {
  let component: PostJobCompanyComponent;
  let fixture: ComponentFixture<PostJobCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostJobCompanyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostJobCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
