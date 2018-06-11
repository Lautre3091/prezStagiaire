import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { SagaApp } from './saga-app.model';
import { SagaAppPopupService } from './saga-app-popup.service';
import { SagaAppService } from './saga-app.service';
import { EditorApp, EditorAppService } from '../editor-app';

@Component({
    selector: 'jhi-saga-app-dialog',
    templateUrl: './saga-app-dialog.component.html'
})
export class SagaAppDialogComponent implements OnInit {

    saga: SagaApp;
    isSaving: boolean;

    editors: EditorApp[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private sagaService: SagaAppService,
        private editorService: EditorAppService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.editorService.query()
            .subscribe((res: HttpResponse<EditorApp[]>) => { this.editors = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.saga.id !== undefined) {
            this.subscribeToSaveResponse(
                this.sagaService.update(this.saga));
        } else {
            this.subscribeToSaveResponse(
                this.sagaService.create(this.saga));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<SagaApp>>) {
        result.subscribe((res: HttpResponse<SagaApp>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: SagaApp) {
        this.eventManager.broadcast({ name: 'sagaListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackEditorById(index: number, item: EditorApp) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-saga-app-popup',
    template: ''
})
export class SagaAppPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private sagaPopupService: SagaAppPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.sagaPopupService
                    .open(SagaAppDialogComponent as Component, params['id']);
            } else {
                this.sagaPopupService
                    .open(SagaAppDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
