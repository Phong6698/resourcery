import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectFormDialogComponent } from './project-form-dialog.component';

describe('ProjectFromDialogComponent', () => {
  let component: ProjectFormDialogComponent;
  let fixture: ComponentFixture<ProjectFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectFormDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
