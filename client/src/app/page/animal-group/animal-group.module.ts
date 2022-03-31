import { NgModule } from '@angular/core';

import { BsComponentsModule } from '@biskin-kit/core';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../shared/shared.module';
import { TranslocoLocaleModule } from '@ngneat/transloco-locale';
import { AnimalGroupComponent } from './animal-group.component';
import { AnimalGroupRoutingModule } from './animal-group.routing.module';

@NgModule({
  declarations: [AnimalGroupComponent],
  providers: [],
  exports: [],
  imports: [SharedModule, BsComponentsModule, NgbNavModule, TranslocoLocaleModule, AnimalGroupRoutingModule],
})
export class AnimalGroupModule {}
