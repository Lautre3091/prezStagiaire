import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { EditorAppComponent } from './editor-app.component';
import { EditorAppDetailComponent } from './editor-app-detail.component';
import { EditorAppPopupComponent } from './editor-app-dialog.component';
import { EditorAppDeletePopupComponent } from './editor-app-delete-dialog.component';

@Injectable()
export class EditorAppResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const editorRoute: Routes = [
    {
        path: 'editor-app',
        component: EditorAppComponent,
        resolve: {
            'pagingParams': EditorAppResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Editors'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'editor-app/:id',
        component: EditorAppDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Editors'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const editorPopupRoute: Routes = [
    {
        path: 'editor-app-new',
        component: EditorAppPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Editors'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'editor-app/:id/edit',
        component: EditorAppPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Editors'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'editor-app/:id/delete',
        component: EditorAppDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Editors'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
