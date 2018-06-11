import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { AutorApp } from './autor-app.model';
import { AutorAppPopupService } from './autor-app-popup.service';
import { AutorAppService } from './autor-app.service';

@Component({
    selector: 'jhi-autor-app-dialog',
    templateUrl: './autor-app-dialog.component.html'
})
export class AutorAppDialogComponent implements OnInit {

    autor: AutorApp;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private autorService: AutorAppService,
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
        if (this.autor.id !== undefined) {
            this.subscribeToSaveResponse(
                this.autorService.update(this.autor));
        } else {
            this.subscribeToSaveResponse(
                this.autorService.create(this.autor));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<AutorApp>>) {
        result.subscribe((res: HttpResponse<AutorApp>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: AutorApp) {
        this.eventManager.broadcast({ name: 'autorListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-autor-app-popup',
    template: ''
})
export class AutorAppPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private autorPopupService: AutorAppPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.autorPopupService
                    .open(AutorAppDialogComponent as Component, params['id']);
            } else {
                this.autorPopupService
                    .open(AutorAppDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
