import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager } from 'ng-jhipster';

import { ICustomUser } from 'app/shared/model/custom-user.model';
import { AccountService } from 'app/core/auth/account.service';
import { CustomUserService } from './custom-user.service';

@Component({
  selector: 'jhi-custom-user',
  templateUrl: './custom-user.component.html'
})
export class CustomUserComponent implements OnInit, OnDestroy {
  customUsers: ICustomUser[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected customUserService: CustomUserService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll(): void {
    this.customUserService
      .query()
      .pipe(
        filter((res: HttpResponse<ICustomUser[]>) => res.ok),
        map((res: HttpResponse<ICustomUser[]>) => res.body)
      )
      .subscribe((res: ICustomUser[]) => {
        this.customUsers = res;
      });
  }

  ngOnInit(): void {
    this.loadAll();
    this.accountService.identity().subscribe(account => {
      this.currentAccount = account;
    });
    this.registerChangeInCustomUsers();
  }

  ngOnDestroy(): void {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ICustomUser): number {
    return item.id;
  }

  registerChangeInCustomUsers(): void {
    this.eventSubscriber = this.eventManager.subscribe('customUserListModification', response => this.loadAll());
  }
}
