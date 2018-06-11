import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PrezStagiaireSharedModule } from '../../shared';
import {
    AutorAppService,
    AutorAppPopupService,
    AutorAppComponent,
    AutorAppDetailComponent,
    AutorAppDialogComponent,
    AutorAppPopupComponent,
    AutorAppDeletePopupComponent,
    AutorAppDeleteDialogComponent,
    autorRoute,
    autorPopupRoute,
} from './';

const ENTITY_STATES = [
    ...autorRoute,
    ...autorPopupRoute,
];

@NgModule({
    imports: [
        PrezStagiaireSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        AutorAppComponent,
        AutorAppDetailComponent,
        AutorAppDialogComponent,
        AutorAppDeleteDialogComponent,
        AutorAppPopupComponent,
        AutorAppDeletePopupComponent,
    ],
    entryComponents: [
        AutorAppComponent,
        AutorAppDialogComponent,
        AutorAppPopupComponent,
        AutorAppDeleteDialogComponent,
        AutorAppDeletePopupComponent,
    ],
    providers: [
        AutorAppService,
        AutorAppPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PrezStagiaireAutorAppModule {}
