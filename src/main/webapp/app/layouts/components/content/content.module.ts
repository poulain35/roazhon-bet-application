import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FuseSharedModule } from 'app/@fuse/shared.module';

import { ContentComponent } from 'app/layouts/components/content/content.component';

@NgModule({
  declarations: [ContentComponent],
  imports: [RouterModule, FuseSharedModule],
  exports: [ContentComponent]
})
export class ContentModule {}
