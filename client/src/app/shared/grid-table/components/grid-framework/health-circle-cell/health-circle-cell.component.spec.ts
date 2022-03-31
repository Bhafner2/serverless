import { ComponentFixture, TestBed } from '@angular/core/testing';
import { getTranslocoModule } from '../../../../transloco/transloco-testing.module';
import { HealthCircleCellComponent } from './health-circle-cell.component';

describe('HealthCircleCellComponent', () => {
  let component: HealthCircleCellComponent;
  let fixture: ComponentFixture<HealthCircleCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HealthCircleCellComponent],
      imports: [getTranslocoModule()],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthCircleCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should', () => {
    component.agInit(null);
    const re = component.refresh(null);
    expect(re).toBeTruthy();
  });
});
