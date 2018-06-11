import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { BookApp } from './book-app.model';
import { BookAppService } from './book-app.service';

@Component({
    selector: 'jhi-book-app-detail',
    templateUrl: './book-app-detail.component.html'
})
export class BookAppDetailComponent implements OnInit, OnDestroy {

    book: BookApp;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private bookService: BookAppService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInBooks();
    }

    load(id) {
        this.bookService.find(id)
            .subscribe((bookResponse: HttpResponse<BookApp>) => {
                this.book = bookResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInBooks() {
        this.eventSubscriber = this.eventManager.subscribe(
            'bookListModification',
            (response) => this.load(this.book.id)
        );
    }
}
