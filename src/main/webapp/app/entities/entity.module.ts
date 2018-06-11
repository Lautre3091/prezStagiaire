import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { PrezStagiaireEditorAppModule } from './editor-app/editor-app.module';
import { PrezStagiaireAutorAppModule } from './autor-app/autor-app.module';
import { PrezStagiaireBookAppModule } from './book-app/book-app.module';
import { PrezStagiaireSagaAppModule } from './saga-app/saga-app.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        PrezStagiaireEditorAppModule,
        PrezStagiaireAutorAppModule,
        PrezStagiaireBookAppModule,
        PrezStagiaireSagaAppModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PrezStagiaireEntityModule {}
