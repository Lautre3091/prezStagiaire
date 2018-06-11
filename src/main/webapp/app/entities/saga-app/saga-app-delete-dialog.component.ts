import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { SagaApp } from './saga-app.model';
import { SagaAppPopupService } from './saga-app-popup.service';
import { SagaAppService } from './saga-app.service';

@Component({
    selector: 'jhi-saga-app-delete-dialog',
    templateUrl: './saga-app-delete-dialog.component.html'
})
export class SagaAppDeleteDialogComponent {

    saga: SagaApp;

    constructor(
        private sagaService: SagaAppService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.sagaService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'sagaListModification',
                content: 'Deleted an saga'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-saga-app-delete-popup',
    template: ''
})
export class SagaAppDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private sagaPopupService: SagaAppPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.sagaPopupService
                .open(SagaAppDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
