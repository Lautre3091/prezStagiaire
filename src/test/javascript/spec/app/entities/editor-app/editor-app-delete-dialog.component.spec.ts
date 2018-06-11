/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { PrezStagiaireTestModule } from '../../../test.module';
import { EditorAppDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/editor-app/editor-app-delete-dialog.component';
import { EditorAppService } from '../../../../../../main/webapp/app/entities/editor-app/editor-app.service';

describe('Component Tests', () => {

    describe('EditorApp Management Delete Component', () => {
        let comp: EditorAppDeleteDialogComponent;
        let fixture: ComponentFixture<EditorAppDeleteDialogComponent>;
        let service: EditorAppService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PrezStagiaireTestModule],
                declarations: [EditorAppDeleteDialogComponent],
                providers: [
                    EditorAppService
                ]
            })
            .overrideTemplate(EditorAppDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EditorAppDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EditorAppService);
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
