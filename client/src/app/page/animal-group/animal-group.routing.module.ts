import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnimalGroupComponent } from './animal-group.component';

const routes: Routes = [{ path: '**', component: AnimalGroupComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnimalGroupRoutingModule {}
