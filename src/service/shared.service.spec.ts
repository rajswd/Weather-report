
import {cold} from 'jasmine-marbles';
import { SharedService } from './shared.service';


describe('SharedService', () => {
  let service: SharedService;
  let httpClientSpy: { get: jasmine.Spy };

  beforeEach(() => {

    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new SharedService(httpClientSpy as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  it('should call get on HttpClient with correct URL', () => {
    const country = "TestCity";
    const expectedUrl = `http://api.openweathermap.org/data/2.5/weather?q=${country}&appid=70e6dc0b2d58a825319d7e0ed833d482`; 

    httpClientSpy.get.and.returnValue(cold('a|', {a: null}));
    service.getWeatherReportForCountry(country);
    expect(httpClientSpy.get).toHaveBeenCalledWith(expectedUrl);
  });
  
  it('should emit new name on name$', () => {
    const country = "TestCity";    
    const getSpyMarbles =   '-a|';
    const expectedMarbles = '-c';
    
    httpClientSpy.get.and.returnValue(cold(getSpyMarbles, { a: {name:country, key:country, isSuccess:true}}));

    service.getWeatherReportForCountry(country);

    const expected = cold(expectedMarbles, {c: {name:country, key:country, isSuccess:true}});
    expect(service.subject$.asObservable()).toBeObservable(expected);
  });

  it('should emit nothing on name$ if an error occurs', () => {
    const country = "TestCity";
    const getSpyMarbles =   '-#|';
    const expectedMarbles = '-b';

    httpClientSpy.get.and.returnValue(cold(getSpyMarbles));

    service.getWeatherReportForCountry(country);

    const expected = cold(expectedMarbles, { b: {name:country, key:country, isSuccess:false}});
    expect(service.subject$.asObservable()).toBeObservable(expected);
  });

});