import { ComponentFixture, TestBed } from '@angular/core/testing';
import { getTranslocoModule } from '../../../../transloco/transloco-testing.module';
import { RouterTestingModule } from '@angular/router/testing';
import { NumberWithIconCellComponent } from './number-with-icon-cell.component';

describe('NumberWithIconCellComponent', () => {
  let component: NumberWithIconCellComponent;
  let fixture: ComponentFixture<NumberWithIconCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NumberWithIconCellComponent],
      imports: [getTranslocoModule(), RouterTestingModule.withRoutes([])],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberWithIconCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should setValue', () => {
    const params = {
      icon: 'my-icon',
      number: 'number',
      data: {
        number: 'my-number',
      },
    };

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    component.agInit(params);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    component.refresh(params);

    expect(component.number).toBe('my-number');
    expect(component.icon).toBe('my-icon');
  });

  it('should setValue callback', () => {
    const params = {
      icon: 'my-icon',
      numberFn: () => {
        return 'my-number-callback';
      },
      data: {
        number: 'my-number',
      },
    };

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    component.agInit(params);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    component.refresh(params);
    component.setValues(params);

    expect(component.number).toBe('my-number-callback');
    expect(component.icon).toBe('my-icon');
  });
});
