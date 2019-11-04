import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { errorRoute } from './layouts/error/error.route';
import { navbarRoute } from './layouts/navbar/navbar.route';
import { DEBUG_INFO_ENABLED } from 'app/app.constants';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        {
          path: 'admin',
          data: {
            authorities: ['ROLE_ADMIN']
          },
          canActivate: [UserRouteAccessService],
          loadChildren: () => import('./admin/admin-routing.module').then(m => m.AdminRoutingModule)
        },
        {
          path: 'apps',
          data: {
            authorities: ['ROLE_ADMIN', 'ROLE_USER']
          },
          canActivate: [UserRouteAccessService],
          loadChildren: () => import('./apps/apps.module').then(m => m.AppsModule)
        },
        {
          path: 'ui',
          data: {
            authorities: ['ROLE_ADMIN', 'ROLE_USER']
          },
          canActivate: [UserRouteAccessService],
          loadChildren: () => import('./ui/ui.module').then(m => m.UIModule)
        }
      ],
      { enableTracing: DEBUG_INFO_ENABLED }
    )
  ],
  exports: [RouterModule]
})
export class RoazhonBetApplicationAppRoutingModule {}
