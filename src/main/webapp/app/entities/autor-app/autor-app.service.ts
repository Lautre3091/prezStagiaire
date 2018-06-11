import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { AutorApp } from './autor-app.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<AutorApp>;

@Injectable()
export class AutorAppService {

    private resourceUrl =  SERVER_API_URL + 'api/autors';

    constructor(private http: HttpClient) { }

    create(autor: AutorApp): Observable<EntityResponseType> {
        const copy = this.convert(autor);
        return this.http.post<AutorApp>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(autor: AutorApp): Observable<EntityResponseType> {
        const copy = this.convert(autor);
        return this.http.put<AutorApp>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<AutorApp>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<AutorApp[]>> {
        const options = createRequestOption(req);
        return this.http.get<AutorApp[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<AutorApp[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: AutorApp = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<AutorApp[]>): HttpResponse<AutorApp[]> {
        const jsonResponse: AutorApp[] = res.body;
        const body: AutorApp[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to AutorApp.
     */
    private convertItemFromServer(autor: AutorApp): AutorApp {
        const copy: AutorApp = Object.assign({}, autor);
        return copy;
    }

    /**
     * Convert a AutorApp to a JSON which can be sent to the server.
     */
    private convert(autor: AutorApp): AutorApp {
        const copy: AutorApp = Object.assign({}, autor);
        return copy;
    }
}
