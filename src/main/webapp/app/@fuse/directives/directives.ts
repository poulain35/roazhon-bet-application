import { NgModule } from '@angular/core';

import { FuseIfOnDomDirective } from 'app/@fuse/directives/fuse-if-on-dom/fuse-if-on-dom.directive';
import { FuseInnerScrollDirective } from 'app/@fuse/directives/fuse-inner-scroll/fuse-inner-scroll.directive';
import { FusePerfectScrollbarDirective } from 'app/@fuse/directives/fuse-perfect-scrollbar/fuse-perfect-scrollbar.directive';
import {
  FuseMatSidenavHelperDirective,
  FuseMatSidenavTogglerDirective
} from 'app/@fuse/directives/fuse-mat-sidenav/fuse-mat-sidenav.directive';

@NgModule({
  declarations: [
    FuseIfOnDomDirective,
    FuseInnerScrollDirective,
    FuseMatSidenavHelperDirective,
    FuseMatSidenavTogglerDirective,
    FusePerfectScrollbarDirective
  ],
  imports: [],
  exports: [
    FuseIfOnDomDirective,
    FuseInnerScrollDirective,
    FuseMatSidenavHelperDirective,
    FuseMatSidenavTogglerDirective,
    FusePerfectScrollbarDirective
  ]
})
export class FuseDirectivesModule {}
