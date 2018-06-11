/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { PrezStagiaireTestModule } from '../../../test.module';
import { EditorAppDetailComponent } from '../../../../../../main/webapp/app/entities/editor-app/editor-app-detail.component';
import { EditorAppService } from '../../../../../../main/webapp/app/entities/editor-app/editor-app.service';
import { EditorApp } from '../../../../../../main/webapp/app/entities/editor-app/editor-app.model';

describe('Component Tests', () => {

    describe('EditorApp Management Detail Component', () => {
        let comp: EditorAppDetailComponent;
        let fixture: ComponentFixture<EditorAppDetailComponent>;
        let service: EditorAppService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PrezStagiaireTestModule],
                declarations: [EditorAppDetailComponent],
                providers: [
                    EditorAppService
                ]
            })
            .overrideTemplate(EditorAppDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EditorAppDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EditorAppService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new EditorApp(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.editor).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
