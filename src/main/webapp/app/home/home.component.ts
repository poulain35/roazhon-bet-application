import { Component, OnInit } from '@angular/core';

import { LoginService } from 'app/core/login/login.service';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/user/account.model';
import { MatchService } from 'app/entities/match/match.service';
import { IMatch } from 'app/shared/model/match.model';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { JhiAlertService } from 'ng-jhipster';

@Component({
  selector: 'jhi-home',
  templateUrl: './home.component.html',
  styleUrls: ['home.scss']
})
export class HomeComponent implements OnInit {
  account: Account;
  matchs: IMatch[];
  displayedColumns: string[] = ['match', 'domicile', 'nul', 'exterieur'];

  constructor(
    private accountService: AccountService,
    private loginService: LoginService,
    private matchService: MatchService,
    protected jhiAlertService: JhiAlertService
  ) {}

  ngOnInit(): void {
    this.accountService.identity().subscribe((account: Account) => {
      this.account = account;
    });
    this.matchService.query().subscribe(
      (res: HttpResponse<IMatch[]>) => {
        this.matchs = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  protected onError(errorMessage: string): void {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  isAuthenticated(): boolean {
    return this.accountService.isAuthenticated();
  }

  login(): void {
    this.loginService.login();
  }
}
