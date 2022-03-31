import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'ration-overview',
    loadChildren: () =>
      import('./page/ration-overview/ration-overview.module').then((module) => module.RationOverviewModule),
  },
  {
    path: 'animal-group/',
    loadChildren: () => import('./page/animal-group/animal-group.module').then((module) => module.AnimalGroupModule),
  },
  {
    path: 'animal-group/:id',
    loadChildren: () => import('./page/animal-group/animal-group.module').then((module) => module.AnimalGroupModule),
  },
  {
    path: 'balance',
    loadChildren: () => import('./page/balance/balance.module').then((module) => module.BalanceModule),
  },
  {
    path: 'forage',
    loadChildren: () => import('./page/forage/forage.module').then((module) => module.ForageModule),
  },
  {
    path: '**',
    redirectTo: 'ration-overview',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes as Routes, { enableTracing: false })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
