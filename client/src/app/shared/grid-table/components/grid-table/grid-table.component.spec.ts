import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { getTranslocoModule } from '../../../transloco/transloco-testing.module';
import { GridTableComponent } from './grid-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import {
  ActionCellComponent,
  DateCellComponent,
  FavouriteCellComponent,
  HealthCircleCellComponent,
  InlineMenuCellComponent,
  LinkButtonCellComponent,
  MlViewCellComponent,
  NumberWithIconCellComponent,
  TextCellComponent,
  TextWithSubtextCellComponent,
} from '../grid-framework';
import { RouterTestingModule } from '@angular/router/testing';

interface MockDataRow {
  id: number;
  name: string;
  producerName?: string;
  birthday?: string;
}

export const mockTableColumnDefs = [
  {
    headerName: 'name',
    cellRenderer: 'TextWithSubtextCellComponent',
    cellRendererParams: {
      text: 'name',
      subText: 'producerName',
    },
    width: 300,
  },
  {
    headerName: 'icon',
    cellRenderer: 'NumberWithIconCellComponent',
    cellRendererParams: {
      text: 'name',
      icon: 'ico-calendar',
    },
    width: 200,
  },
  {
    headerName: 'producerName',
    cellRenderer: 'TextCellComponent',
    cellRendererParams: {
      text: 'producerName',
    },
    width: 300,
  },
  {
    headerName: 'date',
    cellRenderer: 'DateCellComponent',
    cellRendererParams: {
      date: 'birthday',
    },
    width: 300,
  },
  {
    headerName: 'table.column.favourite',
    cellRenderer: 'FavouriteCellComponent',
    cellRendererParams: {
      isFavourite: 'id',
    },
    width: 100,
  },
  {
    cellRenderer: 'ActionCellComponent',
    cellRendererParams: {
      actionId: 'detail',
      actionLabel: 'detail',
    },
    width: 120,
  },
];
const mockTableMockData: MockDataRow[] = [
  {
    id: 1111111,
    name: 'Futtername 1',
    birthday: '2020-11-01',
  },
  {
    id: 1111112,
    name: 'Futtername 2',
    producerName: 'My Company1',
    birthday: '2020-10-05',
  },
  {
    id: 1111113,
    name: 'Futtername 3',
    producerName: 'My Company2',
    birthday: '2020-12-12',
  },
];

describe('GridTableComponent', () => {
  let component: GridTableComponent<MockDataRow>;
  let fixture: ComponentFixture<GridTableComponent<MockDataRow>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        AgGridModule.withComponents([
          ActionCellComponent,
          TextWithSubtextCellComponent,
          NumberWithIconCellComponent,
          TextCellComponent,
          HealthCircleCellComponent,
          InlineMenuCellComponent,
          MlViewCellComponent,
          LinkButtonCellComponent,
          DateCellComponent,
          FavouriteCellComponent,
        ]),
        getTranslocoModule(),
        ReactiveFormsModule,
        FormsModule,
      ],
      declarations: [
        GridTableComponent,
        ActionCellComponent,
        TextWithSubtextCellComponent,
        NumberWithIconCellComponent,
        TextCellComponent,
        HealthCircleCellComponent,
        InlineMenuCellComponent,
        MlViewCellComponent,
        LinkButtonCellComponent,
        DateCellComponent,
        FavouriteCellComponent,
      ],
    }).compileComponents();
  });

  beforeEach(async(() => {
    fixture = TestBed.createComponent<GridTableComponent<MockDataRow>>(GridTableComponent);
    component = fixture.componentInstance;
    component.data = mockTableMockData;
    component.config = {
      allowSelection: 'multiple',
    };
    component.initSelectedData = [mockTableMockData[0]];
    component.columnDefs = mockTableColumnDefs;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter results when search term used', () => {
    component.ngOnChanges();
    expect(component.gridApi).toBeTruthy();

    expect(component.gridApi.getDisplayedRowCount()).toEqual(3);
    component.globalSearchTerm = 'company';
    component.onChangeGlobalSearchTermEvent();
    fixture.detectChanges();
    expect(component.gridApi.getDisplayedRowCount()).toEqual(2);

    const row0 = component.gridApi.getDisplayedRowAtIndex(0);
    const row1 = component.gridApi.getDisplayedRowAtIndex(1);
    component.tableColumnDefs.forEach((tableColumn) => {
      if (tableColumn.comparator) {
        expect(tableColumn.comparator(undefined, undefined, row0, row1)).not.toEqual(0);
      }

      if (tableColumn.getQuickFilterText) {
        expect(tableColumn.getQuickFilterText(row0)).not.toEqual('');
      }
    });
  });

  it('should emit actionRow event on addEntryClick', () => {
    component.ngOnChanges();

    jest.spyOn(component['actionRow'], 'emit');
    component.addEntryClick();
    expect(component.actionRow.emit).toHaveBeenCalledWith({
      actionId: 'add',
      row: undefined,
    });
  });

  it('should emit actionRow event on onActionTriggered', () => {
    component.ngOnChanges();

    jest.spyOn(component['actionRow'], 'emit');
    component.onActionTriggered('myaction', mockTableMockData[0]);
    expect(component.actionRow.emit).toHaveBeenCalledWith({
      actionId: 'myaction',
      row: mockTableMockData[0],
    });
  });
});
