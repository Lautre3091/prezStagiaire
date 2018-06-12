import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { BookApp } from './book-app.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<BookApp>;

@Injectable()
export class BookAppService {

    private resourceUrl =  SERVER_API_URL + 'api/books';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(book: BookApp): Observable<EntityResponseType> {
        const copy = this.convert(book);
        return this.http.post<BookApp>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(book: BookApp): Observable<EntityResponseType> {
        const copy = this.convert(book);
        return this.http.put<BookApp>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<BookApp>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<BookApp[]>> {
        const options = createRequestOption(req);
        return this.http.get<BookApp[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<BookApp[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: BookApp = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<BookApp[]>): HttpResponse<BookApp[]> {
        const jsonResponse: BookApp[] = res.body;
        const body: BookApp[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to BookApp.
     */
    private convertItemFromServer(book: BookApp): BookApp {
        const copy: BookApp = Object.assign({}, book);
        copy.releaseDate = this.dateUtils
            .convertDateTimeFromServer(book.releaseDate);
        return copy;
    }

    /**
     * Convert a BookApp to a JSON which can be sent to the server.
     */
    private convert(book: BookApp): BookApp {
        const copy: BookApp = Object.assign({}, book);

        copy.releaseDate = this.dateUtils.toDate(book.releaseDate);
        return copy;
    }
}
