import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { AutorApp } from './autor-app.model';
import { AutorAppPopupService } from './autor-app-popup.service';
import { AutorAppService } from './autor-app.service';

@Component({
    selector: 'jhi-autor-app-delete-dialog',
    templateUrl: './autor-app-delete-dialog.component.html'
})
export class AutorAppDeleteDialogComponent {

    autor: AutorApp;

    constructor(
        private autorService: AutorAppService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.autorService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'autorListModification',
                content: 'Deleted an autor'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-autor-app-delete-popup',
    template: ''
})
export class AutorAppDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private autorPopupService: AutorAppPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.autorPopupService
                .open(AutorAppDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
