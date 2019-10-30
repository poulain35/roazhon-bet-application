import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Monnaie } from 'app/shared/model/monnaie.model';
import { MonnaieService } from './monnaie.service';
import { MonnaieComponent } from './monnaie.component';
import { MonnaieDetailComponent } from './monnaie-detail.component';
import { MonnaieUpdateComponent } from './monnaie-update.component';
import { MonnaieDeletePopupComponent } from './monnaie-delete-dialog.component';
import { IMonnaie } from 'app/shared/model/monnaie.model';

@Injectable({ providedIn: 'root' })
export class MonnaieResolve implements Resolve<IMonnaie> {
  constructor(private service: MonnaieService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IMonnaie> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Monnaie>) => response.ok),
        map((monnaie: HttpResponse<Monnaie>) => monnaie.body)
      );
    }
    return of(new Monnaie());
  }
}

export const monnaieRoute: Routes = [
  {
    path: '',
    component: MonnaieComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'roazhonBetApplicationApp.monnaie.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: MonnaieDetailComponent,
    resolve: {
      monnaie: MonnaieResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'roazhonBetApplicationApp.monnaie.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: MonnaieUpdateComponent,
    resolve: {
      monnaie: MonnaieResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'roazhonBetApplicationApp.monnaie.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: MonnaieUpdateComponent,
    resolve: {
      monnaie: MonnaieResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'roazhonBetApplicationApp.monnaie.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const monnaiePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: MonnaieDeletePopupComponent,
    resolve: {
      monnaie: MonnaieResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'roazhonBetApplicationApp.monnaie.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
