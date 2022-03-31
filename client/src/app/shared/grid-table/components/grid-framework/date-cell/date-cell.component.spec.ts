import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DateCellComponent } from './date-cell.component';
import { getTranslocoModule } from '../../../../transloco/transloco-testing.module';

describe('DateCellComponent', () => {
  let component: DateCellComponent;
  let fixture: ComponentFixture<DateCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DateCellComponent],
      imports: [getTranslocoModule()],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DateCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should setValue', () => {
    const date = '2020-01-01';
    const params = {
      dateFn: () => date,
    };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    component.agInit(params);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    component.refresh(params);
    component.setValue(params);

    expect(component.date).toBe('01.01.2020');
  });
});
