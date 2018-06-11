import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { AutorAppComponent } from './autor-app.component';
import { AutorAppDetailComponent } from './autor-app-detail.component';
import { AutorAppPopupComponent } from './autor-app-dialog.component';
import { AutorAppDeletePopupComponent } from './autor-app-delete-dialog.component';

export const autorRoute: Routes = [
    {
        path: 'autor-app',
        component: AutorAppComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Autors'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'autor-app/:id',
        component: AutorAppDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Autors'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const autorPopupRoute: Routes = [
    {
        path: 'autor-app-new',
        component: AutorAppPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Autors'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'autor-app/:id/edit',
        component: AutorAppPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Autors'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'autor-app/:id/delete',
        component: AutorAppDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Autors'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
