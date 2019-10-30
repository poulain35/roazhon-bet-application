import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { RoazhonBetApplicationTestModule } from '../../../test.module';
import { MonnaieDeleteDialogComponent } from 'app/entities/monnaie/monnaie-delete-dialog.component';
import { MonnaieService } from 'app/entities/monnaie/monnaie.service';

describe('Component Tests', () => {
  describe('Monnaie Management Delete Component', () => {
    let comp: MonnaieDeleteDialogComponent;
    let fixture: ComponentFixture<MonnaieDeleteDialogComponent>;
    let service: MonnaieService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [RoazhonBetApplicationTestModule],
        declarations: [MonnaieDeleteDialogComponent]
      })
        .overrideTemplate(MonnaieDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(MonnaieDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MonnaieService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete('123');
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith('123');
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
