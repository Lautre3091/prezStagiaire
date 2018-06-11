import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { SagaAppComponent } from './saga-app.component';
import { SagaAppDetailComponent } from './saga-app-detail.component';
import { SagaAppPopupComponent } from './saga-app-dialog.component';
import { SagaAppDeletePopupComponent } from './saga-app-delete-dialog.component';

@Injectable()
export class SagaAppResolvePagingParams implements Resolve<any> {

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

export const sagaRoute: Routes = [
    {
        path: 'saga-app',
        component: SagaAppComponent,
        resolve: {
            'pagingParams': SagaAppResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Sagas'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'saga-app/:id',
        component: SagaAppDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Sagas'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const sagaPopupRoute: Routes = [
    {
        path: 'saga-app-new',
        component: SagaAppPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Sagas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'saga-app/:id/edit',
        component: SagaAppPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Sagas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'saga-app/:id/delete',
        component: SagaAppDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Sagas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
