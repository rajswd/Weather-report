import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IWeatherData } from '../interface/IweatherData';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input()
  cityReport?: IWeatherData = {} as IWeatherData;

  @Output()
  clickDeleteWidget: EventEmitter<any> = new EventEmitter();

  @Output()
  handleWeatherForcast: EventEmitter<any> = new EventEmitter();


  constructor() { }

  ngOnInit(): void {
  }

  deleteCity(): void{
    this.clickDeleteWidget.emit({key: this.cityReport?.key, name: this.cityReport?.name});
  }

  getImageURL(): string{
    return this.cityReport?.weather && this.cityReport.weather.length > 0 ?
      `http://openweathermap.org/img/wn/${this.cityReport.weather[0].icon}@2x.png` : ' ' ;
  }

  openWeatherDetail(): void{
    this.handleWeatherForcast.emit(this.cityReport?.key);
  }

}
