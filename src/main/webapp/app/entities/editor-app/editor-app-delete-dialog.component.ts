import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { EditorApp } from './editor-app.model';
import { EditorAppPopupService } from './editor-app-popup.service';
import { EditorAppService } from './editor-app.service';

@Component({
    selector: 'jhi-editor-app-delete-dialog',
    templateUrl: './editor-app-delete-dialog.component.html'
})
export class EditorAppDeleteDialogComponent {

    editor: EditorApp;

    constructor(
        private editorService: EditorAppService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.editorService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'editorListModification',
                content: 'Deleted an editor'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-editor-app-delete-popup',
    template: ''
})
export class EditorAppDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private editorPopupService: EditorAppPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.editorPopupService
                .open(EditorAppDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
