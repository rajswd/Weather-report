import { Component, OnInit, OnDestroy } from '@angular/core';
import { SharedService } from 'src/service/shared.service';
import { Subject } from 'rxjs';

import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { createUrlResolverWithoutPackagePrefix } from '@angular/compiler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{

  unsubscribe:any = new Subject();
  title = 'weather-app';
  subject:any;
  bhSubjectList:any[] = [];
  isTimerStarted:boolean = false;
  selectedCity:any = {};

  interval:any;

  cityList:string[] = ["Amsterdam", "Berlin", "Barcelona", "London", "Paris"];

  constructor(private sharedService:SharedService, private config: NgbModalConfig, private modalService: NgbModal){
    
    config.keyboard = false;
    config.animation = true;
    config.centered = true;
    config.keyboard = true;
  }

  // Your goal is to get the current weather situation displaying the city name plus average temperature and the wind
  // strength. Clicking on an item shows the forecast in the next hours. 

  ngOnInit(): void {
    this.sharedService.subject$.asObservable().subscribe(data=>{
      if(data && this.cityList.indexOf(data.name) > -1){
        const weatherList = [...this.bhSubjectList];
        weatherList[this.cityList.indexOf(data.name)] = data;
        this.bhSubjectList = weatherList;
      }
    });

    this.triggerInterval();
  }

  triggerInterval(){
    this.getWetherList();
    this.interval = window.setInterval(()=>{
      this.getWetherList();
    },1000*60*30);
  }

  getWetherList(){
    this.cityList.forEach(city=>this.sharedService.getWeatherReportForCountry(city));
  }

  startTimer(){

    clearInterval(this.interval);
    this.triggerInterval();
    this.isTimerStarted = true;
  }

  stopTimer(){
    clearInterval(this.interval);
    this.sharedService.stopTimer();
    this.isTimerStarted = false;
  }

  open(content:any, selectedCity:any) {
    this.selectedCity = selectedCity;
    this.modalService.open(content);
  }

  addCity(cityEl:HTMLInputElement){
    const city = cityEl.value;
    
    if(this.cityList.indexOf(city) < 0){
      this.cityList.push(city);
      this.sharedService.getWeatherReportForCountry(city);
      cityEl.value ="";
    }else{
      alert("--Country is available-");
    }
  }

  deleteCity(index:number){
    this.bhSubjectList.splice(index,1);
    this.cityList.splice(index,1);
  }

  ngOnDestroy(){
    this.unsubscribe.next();
    this.unsubscribe.complete();

  }
}
