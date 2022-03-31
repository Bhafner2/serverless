import { NgModule } from '@angular/core';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsModule } from '@ngxs/store';
import { environment } from '../../environments/environment';
import { NgxsSelectSnapshotModule } from '@ngxs-labs/select-snapshot';
import { DefaultState } from './default';

const states = [DefaultState];

@NgModule({
  imports: [
    NgxsModule.forRoot(states, { developmentMode: !environment.production }),
    NgxsSelectSnapshotModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot({ name: 'NGXS store', disabled: environment.production, maxAge: 10 }),
  ],
})
export class StoreModule {}
