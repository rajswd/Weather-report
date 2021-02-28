import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  weatherData$:Subject<any> = new Subject();
  weatherForecast$:Subject<any> = new Subject();
  
  constructor(private http: HttpClient) { }

  getWeatherReportForCity(city:string){
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=70e6dc0b2d58a825319d7e0ed833d482`;

      let sub = this.http.get(url).subscribe(res=>{
        this.weatherData$.next({...res, ...{isSuccess:true, key:city}});
        sub.unsubscribe();
      },err=>{
        this.weatherData$.next({name:city, key:city, isSuccess:false});
        sub.unsubscribe();
      });
  }

  getWeatherForecastData(city:string):Observable<any>{
    const url = ` http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&cnt=8&APPID=70e6dc0b2d58a825319d7e0ed833d482`;
    return this.http.get(url);
  }

}
