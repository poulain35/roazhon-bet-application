import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RoazhonBetApplicationSharedModule } from 'app/shared/shared.module';
import { MatchComponent } from './match.component';
import { MatchDetailComponent } from './match-detail.component';
import { MatchUpdateComponent } from './match-update.component';
import { MatchDeletePopupComponent, MatchDeleteDialogComponent } from './match-delete-dialog.component';
import { matchRoute, matchPopupRoute } from './match.route';

const ENTITY_STATES = [...matchRoute, ...matchPopupRoute];

@NgModule({
  imports: [RoazhonBetApplicationSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [MatchComponent, MatchDetailComponent, MatchUpdateComponent, MatchDeleteDialogComponent, MatchDeletePopupComponent],
  entryComponents: [MatchDeleteDialogComponent]
})
export class RoazhonBetApplicationMatchModule {}
