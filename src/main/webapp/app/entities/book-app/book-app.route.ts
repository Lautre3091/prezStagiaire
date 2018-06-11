import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { BookAppComponent } from './book-app.component';
import { BookAppDetailComponent } from './book-app-detail.component';
import { BookAppPopupComponent } from './book-app-dialog.component';
import { BookAppDeletePopupComponent } from './book-app-delete-dialog.component';

export const bookRoute: Routes = [
    {
        path: 'book-app',
        component: BookAppComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Books'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'book-app/:id',
        component: BookAppDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Books'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const bookPopupRoute: Routes = [
    {
        path: 'book-app-new',
        component: BookAppPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Books'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'book-app/:id/edit',
        component: BookAppPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Books'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'book-app/:id/delete',
        component: BookAppDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Books'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
