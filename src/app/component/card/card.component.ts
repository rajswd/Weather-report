import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { IWeatherData }  from '../interface/IweatherData';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input()
  cityReport?: IWeatherData = {} as IWeatherData;

  @Output()
  onDeleteWidget:EventEmitter<any> = new EventEmitter();

  @Output()
  onWeatherForcast:EventEmitter<any> = new EventEmitter();


  constructor() { }

  ngOnInit(): void {
  }

  deleteCity(){
    this.onDeleteWidget.emit({key: this.cityReport?.key, name: this.cityReport?.name});
  }

  getImageURL():string{
    return this.cityReport?.weather && this.cityReport.weather.length > 0 ?
      `http://openweathermap.org/img/wn/${this.cityReport.weather[0].icon}@2x.png` : " " ;
  }

  openWeatherDetail() {
    this.onWeatherForcast.emit(this.cityReport?.key);
  }

}
