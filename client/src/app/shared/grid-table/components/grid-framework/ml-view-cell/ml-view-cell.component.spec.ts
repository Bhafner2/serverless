import { ComponentFixture, TestBed } from '@angular/core/testing';
import { getTranslocoModule } from '../../../../transloco/transloco-testing.module';
import { ICellRendererParams } from 'ag-grid-community';
import { MlViewCellComponent } from './ml-view-cell.component';

describe('MlViewCellComponent', () => {
  let component: MlViewCellComponent;
  let fixture: ComponentFixture<MlViewCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MlViewCellComponent],
      imports: [getTranslocoModule()],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MlViewCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should setValue', () => {
    const date = '2020-01-01';
    const date2 = '2011-02-02';
    const params = {
      data: {
        milkPerformanceData: [
          {
            date2,
            milchMorgen: 1,
            milchAbend: 1,
          },
          {
            date,
            milchMorgen: 2,
            milchAbend: 2,
          },
        ],
      },
    } as ICellRendererParams;

    component.agInit(params);
    component.refresh(params);
    component.setValues(params);

    expect(component.ml).toStrictEqual(4);
  });
});
