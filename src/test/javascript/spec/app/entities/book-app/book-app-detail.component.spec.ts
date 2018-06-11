/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { PrezStagiaireTestModule } from '../../../test.module';
import { BookAppDetailComponent } from '../../../../../../main/webapp/app/entities/book-app/book-app-detail.component';
import { BookAppService } from '../../../../../../main/webapp/app/entities/book-app/book-app.service';
import { BookApp } from '../../../../../../main/webapp/app/entities/book-app/book-app.model';

describe('Component Tests', () => {

    describe('BookApp Management Detail Component', () => {
        let comp: BookAppDetailComponent;
        let fixture: ComponentFixture<BookAppDetailComponent>;
        let service: BookAppService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PrezStagiaireTestModule],
                declarations: [BookAppDetailComponent],
                providers: [
                    BookAppService
                ]
            })
            .overrideTemplate(BookAppDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BookAppDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BookAppService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new BookApp(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.book).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
