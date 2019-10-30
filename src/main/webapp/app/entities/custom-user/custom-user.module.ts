import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RoazhonBetApplicationSharedModule } from 'app/shared/shared.module';
import { CustomUserComponent } from './custom-user.component';
import { CustomUserDetailComponent } from './custom-user-detail.component';
import { CustomUserUpdateComponent } from './custom-user-update.component';
import { CustomUserDeletePopupComponent, CustomUserDeleteDialogComponent } from './custom-user-delete-dialog.component';
import { customUserRoute, customUserPopupRoute } from './custom-user.route';

const ENTITY_STATES = [...customUserRoute, ...customUserPopupRoute];

@NgModule({
  imports: [RoazhonBetApplicationSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    CustomUserComponent,
    CustomUserDetailComponent,
    CustomUserUpdateComponent,
    CustomUserDeleteDialogComponent,
    CustomUserDeletePopupComponent
  ],
  entryComponents: [CustomUserDeleteDialogComponent]
})
export class RoazhonBetApplicationCustomUserModule {}
