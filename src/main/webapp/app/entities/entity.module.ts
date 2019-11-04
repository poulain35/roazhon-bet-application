import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'custom-user',
        loadChildren: () => import('./custom-user/custom-user.module').then(m => m.RoazhonBetApplicationCustomUserModule)
      },
      {
        path: 'monnaie',
        loadChildren: () => import('./monnaie/monnaie.module').then(m => m.RoazhonBetApplicationMonnaieModule)
      },
      {
        path: 'match',
        loadChildren: () => import('./match/match.module').then(m => m.RoazhonBetApplicationMatchModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class RoazhonBetApplicationEntityModule {}
