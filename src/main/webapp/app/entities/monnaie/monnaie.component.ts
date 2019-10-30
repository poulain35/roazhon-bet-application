import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager } from 'ng-jhipster';

import { IMonnaie } from 'app/shared/model/monnaie.model';
import { AccountService } from 'app/core/auth/account.service';
import { MonnaieService } from './monnaie.service';

@Component({
  selector: 'jhi-monnaie',
  templateUrl: './monnaie.component.html'
})
export class MonnaieComponent implements OnInit, OnDestroy {
  monnaies: IMonnaie[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected monnaieService: MonnaieService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.monnaieService
      .query()
      .pipe(
        filter((res: HttpResponse<IMonnaie[]>) => res.ok),
        map((res: HttpResponse<IMonnaie[]>) => res.body)
      )
      .subscribe((res: IMonnaie[]) => {
        this.monnaies = res;
      });
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().subscribe(account => {
      this.currentAccount = account;
    });
    this.registerChangeInMonnaies();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IMonnaie) {
    return item.id;
  }

  registerChangeInMonnaies() {
    this.eventSubscriber = this.eventManager.subscribe('monnaieListModification', response => this.loadAll());
  }
}
