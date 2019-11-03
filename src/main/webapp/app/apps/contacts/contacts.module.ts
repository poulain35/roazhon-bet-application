import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

import { FuseSharedModule } from 'app/@fuse/shared.module';
import { FuseConfirmDialogModule, FuseSidebarModule } from 'app/@fuse/components';

import { ContactsComponent } from 'app/apps/contacts/contacts.component';
import { ContactsService } from 'app/apps/contacts/contacts.service';
import { ContactsContactListComponent } from 'app/apps/contacts/contact-list/contact-list.component';
import { ContactsSelectedBarComponent } from 'app/apps/contacts/selected-bar/selected-bar.component';
import { ContactsMainSidebarComponent } from 'app/apps/contacts/sidebars/main/main.component';
import { ContactsContactFormDialogComponent } from 'app/apps/contacts/contact-form/contact-form.component';

const routes: Routes = [
  {
    path: '**',
    component: ContactsComponent,
    resolve: {
      contacts: ContactsService
    }
  }
];

@NgModule({
  declarations: [
    ContactsComponent,
    ContactsContactListComponent,
    ContactsSelectedBarComponent,
    ContactsMainSidebarComponent,
    ContactsContactFormDialogComponent
  ],
  imports: [
    RouterModule.forChild(routes),

    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatRippleModule,
    MatTableModule,
    MatToolbarModule,

    FuseSharedModule,
    FuseConfirmDialogModule,
    FuseSidebarModule
  ],
  providers: [ContactsService],
  entryComponents: [ContactsContactFormDialogComponent]
})
export class ContactsModule {}
