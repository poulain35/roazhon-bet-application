import { NgModule } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { FuseSharedModule } from 'app/@fuse/shared.module';

import { QuickPanelComponent } from 'app/layouts/components/quick-panel/quick-panel.component';

@NgModule({
  declarations: [QuickPanelComponent],
  imports: [MatDividerModule, MatListModule, MatSlideToggleModule, FuseSharedModule],
  exports: [QuickPanelComponent]
})
export class QuickPanelModule {}
