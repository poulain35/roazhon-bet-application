import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RoazhonBetApplicationSharedModule } from 'app/shared/shared.module';
import { MonnaieComponent } from './monnaie.component';
import { MonnaieDetailComponent } from './monnaie-detail.component';
import { MonnaieUpdateComponent } from './monnaie-update.component';
import { MonnaieDeletePopupComponent, MonnaieDeleteDialogComponent } from './monnaie-delete-dialog.component';
import { monnaieRoute, monnaiePopupRoute } from './monnaie.route';

const ENTITY_STATES = [...monnaieRoute, ...monnaiePopupRoute];

@NgModule({
  imports: [RoazhonBetApplicationSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    MonnaieComponent,
    MonnaieDetailComponent,
    MonnaieUpdateComponent,
    MonnaieDeleteDialogComponent,
    MonnaieDeletePopupComponent
  ],
  entryComponents: [MonnaieDeleteDialogComponent]
})
export class RoazhonBetApplicationMonnaieModule {}
