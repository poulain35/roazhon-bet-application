import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';

import { FuseSidebarModule, FuseThemeOptionsModule } from 'app/@fuse/components';
import { FuseSharedModule } from 'app/@fuse/shared.module';

import { ChatPanelModule } from 'app/layouts/components/chat-panel/chat-panel.module';
import { ContentModule } from 'app/layouts/components/content/content.module';
import { FooterModule } from 'app/layouts/components/footer/footer.module';
import { NavbarModule } from 'app/layouts/components/navbar/navbar.module';
import { QuickPanelModule } from 'app/layouts/components/quick-panel/quick-panel.module';
import { ToolbarModule } from 'app/layouts/components/toolbar/toolbar.module';

import { HorizontalLayout1Component } from 'app/layouts/horizontal/layout-1/layout-1.component';

@NgModule({
  declarations: [HorizontalLayout1Component],
  imports: [
    MatSidenavModule,

    FuseSharedModule,
    FuseSidebarModule,
    FuseThemeOptionsModule,

    ChatPanelModule,
    ContentModule,
    FooterModule,
    NavbarModule,
    QuickPanelModule,
    ToolbarModule
  ],
  exports: [HorizontalLayout1Component]
})
export class HorizontalLayout1Module {}
