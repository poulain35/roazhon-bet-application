import { NgModule } from '@angular/core';

import { UICardsModule } from 'app/ui/cards/cards.module';
import { UIFormsModule } from 'app/ui/profile/profile.module';
import { UIIconsModule } from 'app/ui/icons/icons.module';
import { UITypographyModule } from 'app/ui/typography/typography.module';
import { UIHelperClassesModule } from 'app/ui/helper-classes/helper-classes.module';
import { UIPageLayoutsModule } from 'app/ui/page-layouts/page-layouts.module';
import { UIColorsModule } from 'app/ui/colors/colors.module';
import { RouterModule } from '@angular/router';
import { FuseSharedModule } from 'app/@fuse/shared.module';
/*
@NgModule({
    imports: [
        UICardsModule,
        UIFormsModule,
        UIIconsModule,
        UITypographyModule,
        UIHelperClassesModule,
        UIPageLayoutsModule,
        UIColorsModule
    ]
})
*/

const routes = [
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then(m => m.UIFormsModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), FuseSharedModule]
})
export class UIModule {}
