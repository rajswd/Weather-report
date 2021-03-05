import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Subject, Observable, throwError } from 'rxjs';
import { IWeatherForecast } from 'src/app/component/interface/IweatherData';

import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  weatherData$: Subject<any> = new Subject();
  apiServer = 'http://api.openweathermap.org';

  constructor(private http: HttpClient) { }

  handleError(error: HttpErrorResponse): Observable<string> {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  getWeatherReportForCity(city: string): void{
    const url = `${this.apiServer}/data/2.5/weather?q=${city}&units=imperial&appid=70e6dc0b2d58a825319d7e0ed833d482`;

    const sub = this.http.get(url).pipe(catchError(this.handleError)).subscribe((res: any) => {
        this.weatherData$.next({...res, ...{isSuccess: true, key: city}});
        sub.unsubscribe();
      }, err => {
        this.weatherData$.next({name: city, key: city, isSuccess: false});
        sub.unsubscribe();
      });
  }

  getWeatherForecastData(city: string): Observable<IWeatherForecast | any>{
    const url = `${this.apiServer}/data/2.5/forecast?q=${city}&units=imperial&cnt=8&APPID=70e6dc0b2d58a825319d7e0ed833d482`;
    return this.http.get(url).pipe(catchError(this.handleError))
  }

}
