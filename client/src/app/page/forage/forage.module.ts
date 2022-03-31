import { NgModule } from '@angular/core';

import { BsComponentsModule } from '@biskin-kit/core';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../shared/shared.module';
import { TranslocoLocaleModule } from '@ngneat/transloco-locale';
import { ForageComponent } from './forage.component';
import { ForageRoutingModule } from './forage.routing.module';

@NgModule({
  declarations: [ForageComponent],
  providers: [],
  exports: [],
  imports: [SharedModule, BsComponentsModule, NgbNavModule, TranslocoLocaleModule, ForageRoutingModule],
})
export class ForageModule {}
