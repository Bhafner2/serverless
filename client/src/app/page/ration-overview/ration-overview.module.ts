import { NgModule } from '@angular/core';

import { BsComponentsModule } from '@biskin-kit/core';
import { RationOverviewComponent } from './ration-overview.component';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../shared/shared.module';
import { TranslocoLocaleModule } from '@ngneat/transloco-locale';
import { RationOverviewRoutingModule } from './ration-overview.routing.module';

@NgModule({
  declarations: [RationOverviewComponent],
  providers: [],
  exports: [],
  imports: [SharedModule, BsComponentsModule, NgbNavModule, TranslocoLocaleModule, RationOverviewRoutingModule],
})
export class RationOverviewModule {}
