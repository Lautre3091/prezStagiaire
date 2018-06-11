import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { SagaApp } from './saga-app.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<SagaApp>;

@Injectable()
export class SagaAppService {

    private resourceUrl =  SERVER_API_URL + 'api/sagas';

    constructor(private http: HttpClient) { }

    create(saga: SagaApp): Observable<EntityResponseType> {
        const copy = this.convert(saga);
        return this.http.post<SagaApp>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(saga: SagaApp): Observable<EntityResponseType> {
        const copy = this.convert(saga);
        return this.http.put<SagaApp>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<SagaApp>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<SagaApp[]>> {
        const options = createRequestOption(req);
        return this.http.get<SagaApp[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<SagaApp[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: SagaApp = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<SagaApp[]>): HttpResponse<SagaApp[]> {
        const jsonResponse: SagaApp[] = res.body;
        const body: SagaApp[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to SagaApp.
     */
    private convertItemFromServer(saga: SagaApp): SagaApp {
        const copy: SagaApp = Object.assign({}, saga);
        return copy;
    }

    /**
     * Convert a SagaApp to a JSON which can be sent to the server.
     */
    private convert(saga: SagaApp): SagaApp {
        const copy: SagaApp = Object.assign({}, saga);
        return copy;
    }
}
