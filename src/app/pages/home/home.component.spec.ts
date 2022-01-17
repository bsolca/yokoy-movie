import {ComponentFixture, fakeAsync, TestBed, tick, waitForAsync} from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { getTestScheduler, cold } from 'jasmine-marbles';

import { HomeComponent } from './home.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {ReactiveFormsModule} from '@angular/forms';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports: [
        IonicModule.forRoot(),
        HttpClientTestingModule,
        ReactiveFormsModule,
        RouterTestingModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should fetch movies', fakeAsync(() => {
  //   component.ngOnInit();
  //   tick();
  //   component.movies$.subscribe((mo) => console.log(mo));
  //   expect(5).toEqual(5);
  // }));

  it('should get all movies', async () => {
    getTestScheduler().flush();
  });
});
