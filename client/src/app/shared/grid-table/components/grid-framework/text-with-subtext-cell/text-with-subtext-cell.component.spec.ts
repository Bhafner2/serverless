import { ComponentFixture, TestBed } from '@angular/core/testing';
import { getTranslocoModule } from '../../../../transloco/transloco-testing.module';
import { RouterTestingModule } from '@angular/router/testing';
import { TextWithSubtextCellComponent } from './text-with-subtext-cell.component';

describe('TextWithSubtextCellComponent', () => {
  let component: TextWithSubtextCellComponent;
  let fixture: ComponentFixture<TextWithSubtextCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TextWithSubtextCellComponent],
      imports: [getTranslocoModule(), RouterTestingModule.withRoutes([])],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextWithSubtextCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should setValue', () => {
    const params = {
      text: 'text',
      subText: 'subText',
      data: {
        text: 'my-text',
        subText: 'my-subText',
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
    expect(component.subText).toBe('my-subText');
  });
});
