import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { FuseNavigationModule } from 'app/@fuse/components';
import { FuseSharedModule } from 'app/@fuse/shared.module';

import { NavbarVerticalStyle1Component } from 'app/layouts/components/navbar/vertical/style-1/style-1.component';

@NgModule({
  declarations: [NavbarVerticalStyle1Component],
  imports: [MatButtonModule, MatIconModule, FuseSharedModule, FuseNavigationModule],
  exports: [NavbarVerticalStyle1Component]
})
export class NavbarVerticalStyle1Module {}
