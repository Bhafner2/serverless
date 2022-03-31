import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForageComponent } from './forage.component';

const routes: Routes = [{ path: '**', component: ForageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForageRoutingModule {}
