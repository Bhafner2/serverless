import { NgModule } from '@angular/core';

import { BsComponentsModule } from '@biskin-kit/core';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../shared/shared.module';
import { TranslocoLocaleModule } from '@ngneat/transloco-locale';
import { BalanceComponent } from './balance.component';
import { BalanceRoutingModule } from './balance.routing.module';

@NgModule({
  declarations: [BalanceComponent],
  providers: [],
  exports: [],
  imports: [SharedModule, BsComponentsModule, NgbNavModule, TranslocoLocaleModule, BalanceRoutingModule],
})
export class BalanceModule {}
