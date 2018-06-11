import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PrezStagiaireSharedModule } from '../../shared';
import {
    BookAppService,
    BookAppPopupService,
    BookAppComponent,
    BookAppDetailComponent,
    BookAppDialogComponent,
    BookAppPopupComponent,
    BookAppDeletePopupComponent,
    BookAppDeleteDialogComponent,
    bookRoute,
    bookPopupRoute,
} from './';

const ENTITY_STATES = [
    ...bookRoute,
    ...bookPopupRoute,
];

@NgModule({
    imports: [
        PrezStagiaireSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        BookAppComponent,
        BookAppDetailComponent,
        BookAppDialogComponent,
        BookAppDeleteDialogComponent,
        BookAppPopupComponent,
        BookAppDeletePopupComponent,
    ],
    entryComponents: [
        BookAppComponent,
        BookAppDialogComponent,
        BookAppPopupComponent,
        BookAppDeleteDialogComponent,
        BookAppDeletePopupComponent,
    ],
    providers: [
        BookAppService,
        BookAppPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PrezStagiaireBookAppModule {}
