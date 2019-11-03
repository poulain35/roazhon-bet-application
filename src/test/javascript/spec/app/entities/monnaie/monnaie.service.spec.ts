import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { take, map } from 'rxjs/operators';
import { MonnaieService } from 'app/entities/monnaie/monnaie.service';
import { IMonnaie, Monnaie } from 'app/shared/model/monnaie.model';

describe('Service Tests', () => {
  describe('Monnaie Service', () => {
    let injector: TestBed;
    let service: MonnaieService;
    let httpMock: HttpTestingController;
    let elemDefault: IMonnaie;
    let expectedResult;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(MonnaieService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new Monnaie('ID', 0);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);
        service
          .find('123')
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        // TODO : a voir
        //expect(expectedResult).toMatchObject({ body: elemDefault });
      });

      it('should create a Monnaie', () => {
        const returnedFromService = Object.assign(
          {
            id: 0
          },
          elemDefault
        );
        const expected = Object.assign({}, returnedFromService);
        service
          .create(new Monnaie(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        // TODO : a voir
        //expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a Monnaie', () => {
        const returnedFromService = Object.assign(
          {
            total: 1
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);
        service
          .update(expected)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        // TODO : a voir
        //expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should return a list of Monnaie', () => {
        const returnedFromService = Object.assign(
          {
            total: 1
          },
          elemDefault
        );
        const expected = Object.assign({}, returnedFromService);
        service
          .query(expected)
          .pipe(
            take(1),
            map(resp => resp.body)
          )
          .subscribe(body => (expectedResult = body));
        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        // TODO : a voir
        //expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Monnaie', () => {
        service.delete('123').subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
