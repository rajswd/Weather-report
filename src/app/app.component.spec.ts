import { TestBed, ComponentFixture } from '@angular/core/testing';
import { of } from 'rxjs'

import { SharedService } from 'src/service/shared.service';
import { AppComponent } from './app.component';
import { DialogueComponent } from './component/dialogue/dialogue.component';
import { HeaderComponent } from './component/header/header.component';

describe('AppComponent', () => {
  let sharedServiceSpy:jasmine.SpyObj<SharedService>;
  // let sharedService: SharedService;
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    // sharedService = jasmine.createSpy('SharedService');
    sharedServiceSpy = jasmine.createSpyObj('SharedService', ['getWeatherReportForCountry','weatherData$'])

    await TestBed.configureTestingModule({
      declarations: [AppComponent, DialogueComponent, HeaderComponent ],
      providers: [{provide: SharedService, useValue: sharedServiceSpy}], 
    }).compileComponents();

    // create component and test fixture
    fixture = TestBed.createComponent(AppComponent);

    // get test component from the fixture
    component = fixture.componentInstance;
  });

  it('should create the AppComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should call getWeatherReportForCountry on SharedService', () => {
    const city = "TestCity";
    fixture.detectChanges();

    expect(sharedServiceSpy.getWeatherReportForCity).toHaveBeenCalledWith(city);
  });

  it('should display card for the city in page', () => {
    
    const city = "TestCity";
    // Setting name in service
    sharedServiceSpy.weatherData$.next(of({name:city, key:city, isSuccess:false}));
 
    fixture.detectChanges();
 
    // Checking displayed name
    expect(fixture.debugElement.nativeElement.innerText).toContain('city');
  });

  // it(`should have as title 'weather-app'`, () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.componentInstance;
  //   expect(app.title).toEqual('weather-app');
  // });

  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement;
  //   expect(compiled.querySelector('.content span').textContent).toContain('weather-app app is running!');
  // });
});
