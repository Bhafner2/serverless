import { ComponentFixture, TestBed } from '@angular/core/testing';
import { getTranslocoModule } from '../../../../transloco/transloco-testing.module';
import { RouterTestingModule } from '@angular/router/testing';
import { TextCellComponent } from './text-cell.component';

describe('TextCellComponent', () => {
  let component: TextCellComponent;
  let fixture: ComponentFixture<TextCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TextCellComponent],
      imports: [getTranslocoModule(), RouterTestingModule.withRoutes([])],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should setValue', () => {
    const params = {
      text: 'text',
      data: {
        text: 'my-text',
      },
    };

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    component.agInit(params);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    component.refresh(params);
    component.setValues(params);

    expect(component.text).toBe('my-text');
  });
});
