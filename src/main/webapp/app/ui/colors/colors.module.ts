import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';

import { FuseSharedModule } from 'app/@fuse/shared.module';
import { FuseDemoModule } from 'app/@fuse/components/demo/demo.module';

import { ColorsComponent } from 'app/ui/colors/colors.component';

const routes: Routes = [
  {
    path: 'colors',
    component: ColorsComponent
  }
];

@NgModule({
  declarations: [ColorsComponent],
  imports: [RouterModule.forChild(routes), MatButtonModule, MatIconModule, MatTabsModule, FuseSharedModule, FuseDemoModule]
})
export class UIColorsModule {}
