/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { PrezStagiaireTestModule } from '../../../test.module';
import { SagaAppDetailComponent } from '../../../../../../main/webapp/app/entities/saga-app/saga-app-detail.component';
import { SagaAppService } from '../../../../../../main/webapp/app/entities/saga-app/saga-app.service';
import { SagaApp } from '../../../../../../main/webapp/app/entities/saga-app/saga-app.model';

describe('Component Tests', () => {

    describe('SagaApp Management Detail Component', () => {
        let comp: SagaAppDetailComponent;
        let fixture: ComponentFixture<SagaAppDetailComponent>;
        let service: SagaAppService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PrezStagiaireTestModule],
                declarations: [SagaAppDetailComponent],
                providers: [
                    SagaAppService
                ]
            })
            .overrideTemplate(SagaAppDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SagaAppDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SagaAppService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new SagaApp(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.saga).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
