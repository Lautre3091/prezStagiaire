/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { PrezStagiaireTestModule } from '../../../test.module';
import { BookAppDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/book-app/book-app-delete-dialog.component';
import { BookAppService } from '../../../../../../main/webapp/app/entities/book-app/book-app.service';

describe('Component Tests', () => {

    describe('BookApp Management Delete Component', () => {
        let comp: BookAppDeleteDialogComponent;
        let fixture: ComponentFixture<BookAppDeleteDialogComponent>;
        let service: BookAppService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PrezStagiaireTestModule],
                declarations: [BookAppDeleteDialogComponent],
                providers: [
                    BookAppService
                ]
            })
            .overrideTemplate(BookAppDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BookAppDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BookAppService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
