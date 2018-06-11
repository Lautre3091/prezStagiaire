import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { BookApp } from './book-app.model';
import { BookAppPopupService } from './book-app-popup.service';
import { BookAppService } from './book-app.service';
import { AutorApp, AutorAppService } from '../autor-app';
import { SagaApp, SagaAppService } from '../saga-app';

@Component({
    selector: 'jhi-book-app-dialog',
    templateUrl: './book-app-dialog.component.html'
})
export class BookAppDialogComponent implements OnInit {

    book: BookApp;
    isSaving: boolean;

    autors: AutorApp[];

    sagas: SagaApp[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private bookService: BookAppService,
        private autorService: AutorAppService,
        private sagaService: SagaAppService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.autorService.query()
            .subscribe((res: HttpResponse<AutorApp[]>) => { this.autors = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.sagaService.query()
            .subscribe((res: HttpResponse<SagaApp[]>) => { this.sagas = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.book.id !== undefined) {
            this.subscribeToSaveResponse(
                this.bookService.update(this.book));
        } else {
            this.subscribeToSaveResponse(
                this.bookService.create(this.book));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<BookApp>>) {
        result.subscribe((res: HttpResponse<BookApp>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: BookApp) {
        this.eventManager.broadcast({ name: 'bookListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackAutorById(index: number, item: AutorApp) {
        return item.id;
    }

    trackSagaById(index: number, item: SagaApp) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-book-app-popup',
    template: ''
})
export class BookAppPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private bookPopupService: BookAppPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.bookPopupService
                    .open(BookAppDialogComponent as Component, params['id']);
            } else {
                this.bookPopupService
                    .open(BookAppDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
