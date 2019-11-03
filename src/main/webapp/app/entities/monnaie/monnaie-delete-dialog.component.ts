import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMonnaie } from 'app/shared/model/monnaie.model';
import { MonnaieService } from './monnaie.service';

@Component({
  selector: 'jhi-monnaie-delete-dialog',
  templateUrl: './monnaie-delete-dialog.component.html'
})
export class MonnaieDeleteDialogComponent {
  monnaie: IMonnaie;

  constructor(protected monnaieService: MonnaieService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: string) {
    this.monnaieService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'monnaieListModification',
        content: 'Deleted an monnaie'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-monnaie-delete-popup',
  template: ''
})
export class MonnaieDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ monnaie }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(MonnaieDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.monnaie = monnaie;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/monnaie', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/monnaie', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
