import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IMonnaie } from 'app/shared/model/monnaie.model';

type EntityResponseType = HttpResponse<IMonnaie>;
type EntityArrayResponseType = HttpResponse<IMonnaie[]>;

@Injectable({ providedIn: 'root' })
export class MonnaieService {
  public resourceUrl = SERVER_API_URL + 'api/monnaies';

  constructor(protected http: HttpClient) {}

  create(monnaie: IMonnaie): Observable<EntityResponseType> {
    return this.http.post<IMonnaie>(this.resourceUrl, monnaie, { observe: 'response' });
  }

  update(monnaie: IMonnaie): Observable<EntityResponseType> {
    return this.http.put<IMonnaie>(this.resourceUrl, monnaie, { observe: 'response' });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<IMonnaie>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMonnaie[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
