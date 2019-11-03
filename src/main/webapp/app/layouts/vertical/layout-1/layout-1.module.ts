import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FuseSidebarModule } from 'app/@fuse/components';
import { FuseSharedModule } from 'app/@fuse/shared.module';

import { ChatPanelModule } from 'app/layouts/components/chat-panel/chat-panel.module';
import { ContentModule } from 'app/layouts/components/content/content.module';
import { FooterModule } from 'app/layouts/components/footer/footer.module';
import { NavbarModule } from 'app/layouts/components/navbar/navbar.module';
import { QuickPanelModule } from 'app/layouts/components/quick-panel/quick-panel.module';
import { ToolbarModule } from 'app/layouts/components/toolbar/toolbar.module';

import { VerticalLayout1Component } from 'app/layouts/vertical/layout-1/layout-1.component';

@NgModule({
  declarations: [VerticalLayout1Component],
  imports: [
    RouterModule,

    FuseSharedModule,
    FuseSidebarModule,

    ChatPanelModule,
    ContentModule,
    FooterModule,
    NavbarModule,
    QuickPanelModule,
    ToolbarModule
  ],
  exports: [VerticalLayout1Component]
})
export class VerticalLayout1Module {}
