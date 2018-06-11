/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PrezStagiaireTestModule } from '../../../test.module';
import { AutorAppComponent } from '../../../../../../main/webapp/app/entities/autor-app/autor-app.component';
import { AutorAppService } from '../../../../../../main/webapp/app/entities/autor-app/autor-app.service';
import { AutorApp } from '../../../../../../main/webapp/app/entities/autor-app/autor-app.model';

describe('Component Tests', () => {

    describe('AutorApp Management Component', () => {
        let comp: AutorAppComponent;
        let fixture: ComponentFixture<AutorAppComponent>;
        let service: AutorAppService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PrezStagiaireTestModule],
                declarations: [AutorAppComponent],
                providers: [
                    AutorAppService
                ]
            })
            .overrideTemplate(AutorAppComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AutorAppComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AutorAppService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new AutorApp(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.autors[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
