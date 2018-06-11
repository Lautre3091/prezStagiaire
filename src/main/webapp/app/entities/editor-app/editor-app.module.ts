import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PrezStagiaireSharedModule } from '../../shared';
import {
    EditorAppService,
    EditorAppPopupService,
    EditorAppComponent,
    EditorAppDetailComponent,
    EditorAppDialogComponent,
    EditorAppPopupComponent,
    EditorAppDeletePopupComponent,
    EditorAppDeleteDialogComponent,
    editorRoute,
    editorPopupRoute,
    EditorAppResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...editorRoute,
    ...editorPopupRoute,
];

@NgModule({
    imports: [
        PrezStagiaireSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        EditorAppComponent,
        EditorAppDetailComponent,
        EditorAppDialogComponent,
        EditorAppDeleteDialogComponent,
        EditorAppPopupComponent,
        EditorAppDeletePopupComponent,
    ],
    entryComponents: [
        EditorAppComponent,
        EditorAppDialogComponent,
        EditorAppPopupComponent,
        EditorAppDeleteDialogComponent,
        EditorAppDeletePopupComponent,
    ],
    providers: [
        EditorAppService,
        EditorAppPopupService,
        EditorAppResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PrezStagiaireEditorAppModule {}
