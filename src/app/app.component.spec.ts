import { TestBed, ComponentFixture } from '@angular/core/testing';
import { SharedService } from 'src/service/shared.service';
import { AppComponent } from './app.component';
import { DialogueComponent } from './component/dialogue/dialogue.component';
import { HeaderComponent } from './component/header/header.component';
import { CardComponent } from './component/card/card.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { IWeatherData, IWeatherForecast }  from './component/interface/IweatherData';
import { CITY_WEATHER_DATA, CITY_DETAIL, WEATHER_FORECAST_DTL } from 'src/mockData/MoclData';

describe('AppComponent', () => {
  let sharedServiceSpy:jasmine.SpyObj<SharedService>;
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    sharedServiceSpy = jasmine.createSpyObj('SharedService', ['getWeatherReportForCity', 'getWeatherForecastData', 'weatherData$'])

    await TestBed.configureTestingModule({
      declarations: [AppComponent, DialogueComponent, HeaderComponent, CardComponent ],
      imports: [
        BrowserModule,
        FormsModule,
        NgbModule
      ],
      providers: [{provide: SharedService, useValue: sharedServiceSpy}], 
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;

  });

  it('AppComponent: should create the AppComponent', () => {
    expect(component).toBeTruthy();
  });

  it('AppComponent: should call getWeatherReportForCity and render details(card) for the city', () => {
    const city = "barcelona";
    const data: IWeatherData = {...CITY_WEATHER_DATA,...{key:city, isSuccess:true}};

    component.cityList= [city];    
    
    spyOn(component, "subscribeService").and.callFake(()=>{});
    component.weatherList = [data];
    fixture.detectChanges();
  
    expect(sharedServiceSpy.getWeatherReportForCity).toHaveBeenCalledWith(city);
    expect(fixture.debugElement.nativeElement.querySelector('.card.card-columns')).toBeTruthy()
    expect(fixture.debugElement.nativeElement.innerText).toContain("Auto-refresh data in every 30 minutes");

  });

  it(`sAppComponent: hould have as title header 'WEATHER FORECAST'`, () => {
    
    expect(fixture.debugElement.nativeElement.innerText).toContain('WEATHER FORECAST');
    expect(fixture.debugElement.nativeElement.querySelector('#cityInput')).toBeTruthy();    
  });

  it(`AppComponent: should call openDlg method to show the details weather report.`, () => {
    const city = "barcelona";
    const data: IWeatherForecast = {...CITY_WEATHER_DATA,...{key: city, isSuccess: true, city: CITY_DETAIL, list: WEATHER_FORECAST_DTL}};

    component.cityList= [city];
    spyOn(component, "subscribeService").and.callFake(()=>{});
    spyOn(component, "openDlg").and.callFake(()=>{
      sharedServiceSpy.getWeatherForecastData(city);

    });
    component.openDlg(city);
    component.showWeatherForecast(data);
    fixture.detectChanges();
    expect(sharedServiceSpy.getWeatherForecastData).toHaveBeenCalledWith(city);
  
  });

});