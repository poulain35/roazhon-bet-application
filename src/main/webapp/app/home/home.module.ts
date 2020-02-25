import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RoazhonBetApplicationSharedModule } from 'app/shared/shared.module';
import { HOME_ROUTE } from './home.route';
import { HomeComponent } from './home.component';
import { RoazhonBetApplicationMaterialModule } from 'app/material/material.module';
import { FlexModule } from '@angular/flex-layout';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  imports: [
    RoazhonBetApplicationSharedModule,
    RouterModule.forChild([HOME_ROUTE]),
    RoazhonBetApplicationMaterialModule,
    FlexModule,
    MatTableModule
  ],
  declarations: [HomeComponent]
})
export class RoazhonBetApplicationHomeModule {}
