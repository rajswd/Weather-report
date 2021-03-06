
import {cold} from 'jasmine-marbles';
import { SharedService } from './shared.service';


describe('SharedService', () => {
  let service: SharedService;
  let httpClientSpy: { get: jasmine.Spy };

  beforeEach(() => {

    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new SharedService(httpClientSpy as any);
  });

  it('SharedService: should be created', () => {
    expect(service).toBeTruthy();
  });

  it('SharedService: should call get on getWeatherReportForCity with correct URL', () => {
    const city = 'TestCity';
    const expectedUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=70e6dc0b2d58a825319d7e0ed833d482`;

    httpClientSpy.get.and.returnValue(cold('a|', {a: null}));
    service.getWeatherReportForCity(city);
    expect(httpClientSpy.get).toHaveBeenCalledWith(expectedUrl);
  });

  it('SharedService: should emit new name on name$', () => {
    const city = 'TestCity';
    const getSpyMarbles =   '-a|';
    const expectedMarbles = '-c';

    httpClientSpy.get.and.returnValue(cold(getSpyMarbles, { a: {name: city, key: city, isSuccess: true}}));

    service.getWeatherReportForCity(city);

    const expected = cold(expectedMarbles, {c: {name: city, key: city, isSuccess: true}});
    expect(service.weatherData$.asObservable()).toBeObservable(expected);
  });

  it('SharedService: should emit nothing on name$ if an error occurs', () => {
    const city = 'TestCity';
    const getSpyMarbles =   '-#|';
    const expectedMarbles = '-b';

    httpClientSpy.get.and.returnValue(cold(getSpyMarbles));

    service.getWeatherReportForCity(city);

    const expected = cold(expectedMarbles, { b: {name: city, key: city, isSuccess: false}});
    expect(service.weatherData$.asObservable()).toBeObservable(expected);
  });

  it('should call get on getWeatherForecastData with correct URL', () => {
    const city = 'TestCity';
    const expectedUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&cnt=8&APPID=70e6dc0b2d58a825319d7e0ed833d482`;

    httpClientSpy.get.and.returnValue(cold('a|', {a: null}));
    service.getWeatherForecastData(city);
    expect(httpClientSpy.get).toHaveBeenCalledWith(expectedUrl);
  });

  it('sSharedService: hould call get on getWeatherForecastData and return valid data', () => {
    const city = 'TestCity';
    const getSpyMarbles =   '-a|';
    const expectedMarbles = '-b|';

    httpClientSpy.get.and.returnValue(cold(getSpyMarbles, { a: {name: city, key: city, isSuccess: true}}));
    const expected = cold(expectedMarbles, {b: {name: city, key: city, isSuccess: true}});
    expect(service.getWeatherForecastData(city)).toBeObservable(expected);
  });

});
