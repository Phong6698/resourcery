import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ResourceFormDialogComponent} from './resource-form-dialog.component';

describe('ResourceFormDialogComponent', () => {
  let component: ResourceFormDialogComponent;
  let fixture: ComponentFixture<ResourceFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResourceFormDialogComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
