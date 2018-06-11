import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { EditorApp } from './editor-app.model';
import { EditorAppPopupService } from './editor-app-popup.service';
import { EditorAppService } from './editor-app.service';

@Component({
    selector: 'jhi-editor-app-dialog',
    templateUrl: './editor-app-dialog.component.html'
})
export class EditorAppDialogComponent implements OnInit {

    editor: EditorApp;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private editorService: EditorAppService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.editor.id !== undefined) {
            this.subscribeToSaveResponse(
                this.editorService.update(this.editor));
        } else {
            this.subscribeToSaveResponse(
                this.editorService.create(this.editor));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<EditorApp>>) {
        result.subscribe((res: HttpResponse<EditorApp>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: EditorApp) {
        this.eventManager.broadcast({ name: 'editorListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-editor-app-popup',
    template: ''
})
export class EditorAppPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private editorPopupService: EditorAppPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.editorPopupService
                    .open(EditorAppDialogComponent as Component, params['id']);
            } else {
                this.editorPopupService
                    .open(EditorAppDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
