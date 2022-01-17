import {ComponentFixture, TestBed, tick, waitForAsync} from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomeComponent } from './home.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {Movie} from '../../interfaces/movie';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports: [
        IonicModule.forRoot(),
        HttpClientTestingModule,
        RouterTestingModule
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle the modal', () => {
    const movie: Movie = {actor: '', id: 0, name: '', rate: 0, year: 0};
    expect(component.isModalOpen).toBeFalse();
    expect(component.currentMovie).toEqual(null);
    component.toggleModal(true, movie);
    expect(component.isModalOpen).toBeTruthy();
    expect(component.currentMovie).toEqual(movie);
  });
});
