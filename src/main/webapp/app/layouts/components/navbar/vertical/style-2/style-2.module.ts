import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { FuseNavigationModule } from 'app/@fuse/components';
import { FuseSharedModule } from 'app/@fuse/shared.module';

import { NavbarVerticalStyle2Component } from 'app/layouts/components/navbar/vertical/style-2/style-2.component';

@NgModule({
  declarations: [NavbarVerticalStyle2Component],
  imports: [MatButtonModule, MatIconModule, FuseSharedModule, FuseNavigationModule],
  exports: [NavbarVerticalStyle2Component]
})
export class NavbarVerticalStyle2Module {}
