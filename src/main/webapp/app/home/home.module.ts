import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RoazhonBetApplicationSharedModule } from 'app/shared/shared.module';
import { HOME_ROUTE } from './home.route';
import { HomeComponent } from './home.component';
import { RoazhonBetApplicationMaterialModule } from 'app/material/material.module';

@NgModule({
  imports: [RoazhonBetApplicationSharedModule, RouterModule.forChild([HOME_ROUTE]), RoazhonBetApplicationMaterialModule],
  declarations: [HomeComponent]
})
export class RoazhonBetApplicationHomeModule {}
