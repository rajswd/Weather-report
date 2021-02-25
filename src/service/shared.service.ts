import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  subject$:Subject<any> = new Subject();
  bhSubject$:BehaviorSubject<any> = new BehaviorSubject(null);
  
  constructor(private http: HttpClient) { }

  getWeatherReportForCountry(country:string){
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${country}&appid=70e6dc0b2d58a825319d7e0ed833d482`;
    // let url = `http://pro.openweathermap.org/data/2.5/forecast?q=${country}&appid=70e6dc0b2d58a825319d7e0ed833d482`;

    // http://api.openweathermap.org/data/2.5/forecast?q=bern&units=metric&APPID=70e6dc0b2d58a825319d7e0ed833d482

    
      return this.http.get(url).subscribe(res=>{
        this.subject$.next({...res, ...{isSuccess:true}});
        // console.log("succ ------",res);
      },err=>{
        this.subject$.next({name:country,isSuccess:false});
      });
  }

  stopTimer(){
    
  }

}
