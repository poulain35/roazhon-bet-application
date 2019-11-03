import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMonnaie } from 'app/shared/model/monnaie.model';

@Component({
  selector: 'jhi-monnaie-detail',
  templateUrl: './monnaie-detail.component.html'
})
export class MonnaieDetailComponent implements OnInit {
  monnaie: IMonnaie;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ monnaie }) => {
      this.monnaie = monnaie;
    });
  }

  previousState() {
    window.history.back();
  }
}
