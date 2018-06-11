import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PrezStagiaireSharedModule } from '../../shared';
import {
    SagaAppService,
    SagaAppPopupService,
    SagaAppComponent,
    SagaAppDetailComponent,
    SagaAppDialogComponent,
    SagaAppPopupComponent,
    SagaAppDeletePopupComponent,
    SagaAppDeleteDialogComponent,
    sagaRoute,
    sagaPopupRoute,
    SagaAppResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...sagaRoute,
    ...sagaPopupRoute,
];

@NgModule({
    imports: [
        PrezStagiaireSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        SagaAppComponent,
        SagaAppDetailComponent,
        SagaAppDialogComponent,
        SagaAppDeleteDialogComponent,
        SagaAppPopupComponent,
        SagaAppDeletePopupComponent,
    ],
    entryComponents: [
        SagaAppComponent,
        SagaAppDialogComponent,
        SagaAppPopupComponent,
        SagaAppDeleteDialogComponent,
        SagaAppDeletePopupComponent,
    ],
    providers: [
        SagaAppService,
        SagaAppPopupService,
        SagaAppResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PrezStagiaireSagaAppModule {}
