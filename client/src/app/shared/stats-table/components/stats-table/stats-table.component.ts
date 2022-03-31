import { Component, EventEmitter, HostBinding, Input, Output, ViewEncapsulation } from '@angular/core';
import { StatsTableConfig, StatsTableItem } from '../../stats-table.types';

@Component({
  selector: 'app-stats-table',
  templateUrl: './stats-table.component.html',
  styleUrls: ['./stats-table.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class StatsTableComponent {
  @HostBinding('class')
  readonly cssClass = 'app-stats-table';

  @Input() config: StatsTableConfig = { columns: 3 };
  @Input() items: StatsTableItem[];

  @Output() clickEdit = new EventEmitter<void>();
}
