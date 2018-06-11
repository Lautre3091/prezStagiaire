import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { SagaApp } from './saga-app.model';
import { SagaAppService } from './saga-app.service';

@Component({
    selector: 'jhi-saga-app-detail',
    templateUrl: './saga-app-detail.component.html'
})
export class SagaAppDetailComponent implements OnInit, OnDestroy {

    saga: SagaApp;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private sagaService: SagaAppService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInSagas();
    }

    load(id) {
        this.sagaService.find(id)
            .subscribe((sagaResponse: HttpResponse<SagaApp>) => {
                this.saga = sagaResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInSagas() {
        this.eventSubscriber = this.eventManager.subscribe(
            'sagaListModification',
            (response) => this.load(this.saga.id)
        );
    }
}
