import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { EditorApp } from './editor-app.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<EditorApp>;

@Injectable()
export class EditorAppService {

    private resourceUrl =  SERVER_API_URL + 'api/editors';

    constructor(private http: HttpClient) { }

    create(editor: EditorApp): Observable<EntityResponseType> {
        const copy = this.convert(editor);
        return this.http.post<EditorApp>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(editor: EditorApp): Observable<EntityResponseType> {
        const copy = this.convert(editor);
        return this.http.put<EditorApp>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<EditorApp>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<EditorApp[]>> {
        const options = createRequestOption(req);
        return this.http.get<EditorApp[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<EditorApp[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: EditorApp = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<EditorApp[]>): HttpResponse<EditorApp[]> {
        const jsonResponse: EditorApp[] = res.body;
        const body: EditorApp[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to EditorApp.
     */
    private convertItemFromServer(editor: EditorApp): EditorApp {
        const copy: EditorApp = Object.assign({}, editor);
        return copy;
    }

    /**
     * Convert a EditorApp to a JSON which can be sent to the server.
     */
    private convert(editor: EditorApp): EditorApp {
        const copy: EditorApp = Object.assign({}, editor);
        return copy;
    }
}
