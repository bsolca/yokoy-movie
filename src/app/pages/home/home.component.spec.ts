import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomeComponent } from './home.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports: [
        IonicModule.forRoot(),
        HttpClientModule,
        RouterTestingModule
        // HttpClientTestingModule,
        // ReactiveFormsModule,
        // RouterTestingModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
    component.movies$.subscribe((m) => {
      fixture.detectChanges();
      console.log('Testy', m);
    });
  });

  // it('should fetch movies', () => {
  //   com
  //   component.movies$.subscribe((mo) => console.log(mo));
  //   expect(5).toEqual(5);
  // });
});
