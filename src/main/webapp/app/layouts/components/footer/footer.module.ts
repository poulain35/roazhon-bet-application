import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

import { FuseSharedModule } from 'app/@fuse/shared.module';

import { FooterComponent } from 'app/layouts/components/footer/footer.component';

@NgModule({
  declarations: [FooterComponent],
  imports: [RouterModule, MatButtonModule, MatIconModule, MatToolbarModule, FuseSharedModule],
  exports: [FooterComponent]
})
export class FooterModule {}
