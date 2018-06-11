/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PrezStagiaireTestModule } from '../../../test.module';
import { SagaAppComponent } from '../../../../../../main/webapp/app/entities/saga-app/saga-app.component';
import { SagaAppService } from '../../../../../../main/webapp/app/entities/saga-app/saga-app.service';
import { SagaApp } from '../../../../../../main/webapp/app/entities/saga-app/saga-app.model';

describe('Component Tests', () => {

    describe('SagaApp Management Component', () => {
        let comp: SagaAppComponent;
        let fixture: ComponentFixture<SagaAppComponent>;
        let service: SagaAppService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PrezStagiaireTestModule],
                declarations: [SagaAppComponent],
                providers: [
                    SagaAppService
                ]
            })
            .overrideTemplate(SagaAppComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SagaAppComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SagaAppService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new SagaApp(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.sagas[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
