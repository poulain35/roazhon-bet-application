import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IMonnaie, Monnaie } from 'app/shared/model/monnaie.model';
import { MonnaieService } from './monnaie.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';

@Component({
  selector: 'jhi-monnaie-update',
  templateUrl: './monnaie-update.component.html'
})
export class MonnaieUpdateComponent implements OnInit {
  isSaving: boolean;

  users: IUser[];

  editForm = this.fb.group({
    id: [],
    total: [],
    userId: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected monnaieService: MonnaieService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ monnaie }) => {
      this.updateForm(monnaie);
    });
    this.userService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IUser[]>) => mayBeOk.ok),
        map((response: HttpResponse<IUser[]>) => response.body)
      )
      .subscribe((res: IUser[]) => (this.users = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(monnaie: IMonnaie) {
    this.editForm.patchValue({
      id: monnaie.id,
      total: monnaie.total,
      userId: monnaie.userId
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const monnaie = this.createFromForm();
    if (monnaie.id !== undefined) {
      this.subscribeToSaveResponse(this.monnaieService.update(monnaie));
    } else {
      this.subscribeToSaveResponse(this.monnaieService.create(monnaie));
    }
  }

  private createFromForm(): IMonnaie {
    return {
      ...new Monnaie(),
      id: this.editForm.get(['id']).value,
      total: this.editForm.get(['total']).value,
      userId: this.editForm.get(['userId']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMonnaie>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackUserById(index: number, item: IUser) {
    return item.id;
  }
}
