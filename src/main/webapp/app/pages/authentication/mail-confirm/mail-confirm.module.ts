import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

import { FuseSharedModule } from 'app/@fuse/shared.module';

import { MailConfirmComponent } from 'app/pages/authentication/mail-confirm/mail-confirm.component';

const routes = [
  {
    path: 'auth/mail-confirm',
    component: MailConfirmComponent
  }
];

@NgModule({
  declarations: [MailConfirmComponent],
  imports: [RouterModule.forChild(routes), MatIconModule, FuseSharedModule]
})
export class MailConfirmModule {}
