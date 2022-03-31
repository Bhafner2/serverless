import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RationOverviewComponent } from './ration-overview.component';

const routes: Routes = [{ path: '**', component: RationOverviewComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RationOverviewRoutingModule {}
