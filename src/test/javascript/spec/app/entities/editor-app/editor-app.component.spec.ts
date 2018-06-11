/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PrezStagiaireTestModule } from '../../../test.module';
import { EditorAppComponent } from '../../../../../../main/webapp/app/entities/editor-app/editor-app.component';
import { EditorAppService } from '../../../../../../main/webapp/app/entities/editor-app/editor-app.service';
import { EditorApp } from '../../../../../../main/webapp/app/entities/editor-app/editor-app.model';

describe('Component Tests', () => {

    describe('EditorApp Management Component', () => {
        let comp: EditorAppComponent;
        let fixture: ComponentFixture<EditorAppComponent>;
        let service: EditorAppService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PrezStagiaireTestModule],
                declarations: [EditorAppComponent],
                providers: [
                    EditorAppService
                ]
            })
            .overrideTemplate(EditorAppComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EditorAppComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EditorAppService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new EditorApp(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.editors[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
