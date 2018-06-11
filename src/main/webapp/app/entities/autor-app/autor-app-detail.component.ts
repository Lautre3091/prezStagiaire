import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { AutorApp } from './autor-app.model';
import { AutorAppService } from './autor-app.service';

@Component({
    selector: 'jhi-autor-app-detail',
    templateUrl: './autor-app-detail.component.html'
})
export class AutorAppDetailComponent implements OnInit, OnDestroy {

    autor: AutorApp;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private autorService: AutorAppService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInAutors();
    }

    load(id) {
        this.autorService.find(id)
            .subscribe((autorResponse: HttpResponse<AutorApp>) => {
                this.autor = autorResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInAutors() {
        this.eventSubscriber = this.eventManager.subscribe(
            'autorListModification',
            (response) => this.load(this.autor.id)
        );
    }
}
