import { ComponentFixture, TestBed } from '@angular/core/testing';
import { getTranslocoModule } from '../../../../transloco/transloco-testing.module';
import { RouterTestingModule } from '@angular/router/testing';
import { NumberWithLiterCellComponent } from './number-with-liter-cell.component';

describe('NumberWithLiterCellComponent', () => {
  let component: NumberWithLiterCellComponent;
  let fixture: ComponentFixture<NumberWithLiterCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NumberWithLiterCellComponent],
      imports: [getTranslocoModule(), RouterTestingModule.withRoutes([])],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberWithLiterCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should setValue', () => {
    const params = {
      number: 'number',
      data: {
        number: 1,
      },
    };

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    component.agInit(params);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    component.refresh(params);

    expect(component.number).toBe(1);
  });

  it('should setValue callback', () => {
    const params = {
      numberFn: () => {
        return 1.1;
      },
    };

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    component.agInit(params);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    component.refresh(params);
    component.setValues(params);

    expect(component.number).toBe(1.1);
  });
});
