/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { PrezStagiaireTestModule } from '../../../test.module';
import { AutorAppDetailComponent } from '../../../../../../main/webapp/app/entities/autor-app/autor-app-detail.component';
import { AutorAppService } from '../../../../../../main/webapp/app/entities/autor-app/autor-app.service';
import { AutorApp } from '../../../../../../main/webapp/app/entities/autor-app/autor-app.model';

describe('Component Tests', () => {

    describe('AutorApp Management Detail Component', () => {
        let comp: AutorAppDetailComponent;
        let fixture: ComponentFixture<AutorAppDetailComponent>;
        let service: AutorAppService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PrezStagiaireTestModule],
                declarations: [AutorAppDetailComponent],
                providers: [
                    AutorAppService
                ]
            })
            .overrideTemplate(AutorAppDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AutorAppDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AutorAppService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new AutorApp(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.autor).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
