import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { EditorApp } from './editor-app.model';
import { EditorAppService } from './editor-app.service';

@Component({
    selector: 'jhi-editor-app-detail',
    templateUrl: './editor-app-detail.component.html'
})
export class EditorAppDetailComponent implements OnInit, OnDestroy {

    editor: EditorApp;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private editorService: EditorAppService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInEditors();
    }

    load(id) {
        this.editorService.find(id)
            .subscribe((editorResponse: HttpResponse<EditorApp>) => {
                this.editor = editorResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInEditors() {
        this.eventSubscriber = this.eventManager.subscribe(
            'editorListModification',
            (response) => this.load(this.editor.id)
        );
    }
}
