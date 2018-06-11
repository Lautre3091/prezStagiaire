/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PrezStagiaireTestModule } from '../../../test.module';
import { BookAppComponent } from '../../../../../../main/webapp/app/entities/book-app/book-app.component';
import { BookAppService } from '../../../../../../main/webapp/app/entities/book-app/book-app.service';
import { BookApp } from '../../../../../../main/webapp/app/entities/book-app/book-app.model';

describe('Component Tests', () => {

    describe('BookApp Management Component', () => {
        let comp: BookAppComponent;
        let fixture: ComponentFixture<BookAppComponent>;
        let service: BookAppService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PrezStagiaireTestModule],
                declarations: [BookAppComponent],
                providers: [
                    BookAppService
                ]
            })
            .overrideTemplate(BookAppComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BookAppComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BookAppService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new BookApp(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.books[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
