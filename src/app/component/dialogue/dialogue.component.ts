import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ContentRef } from '@ng-bootstrap/ng-bootstrap/util/popup';
import { IWeatherForecast, IForecastDtl, ICity } from '../interface/IweatherData';
import { ICapability } from 'selenium-webdriver';

@Component({
  selector: 'app-dialogue',
  templateUrl: './dialogue.component.html',
  styleUrls: ['./dialogue.component.scss']
})
export class DialogueComponent implements OnInit {

  @ViewChild('contentDlg') private modalContent?: TemplateRef<DialogueComponent>

  cityReport?: ICity;
  weatherDtl?: IForecastDtl;

  constructor(private config: NgbModalConfig, private modalService: NgbModal){
    
    config.keyboard = false;
    config.animation = true;
    config.centered = true;
    config.keyboard = true;
  }

  ngOnInit(): void {
    
  }
  
  openDialogue(selectedCity:IWeatherForecast) {
    this.cityReport = selectedCity.city;
    this.weatherDtl = selectedCity.list[0] || {};
    this.modalService.open(this.modalContent, this.config);
  }

  getImgURL(): string{
    return this.weatherDtl && this.weatherDtl.weather.length > 0 ? 
     `http://openweathermap.org/img/wn/${this.weatherDtl?.weather[0].icon}@2x.png` : " " ;
  }

  getWeatherDecription(): string{
    return this.weatherDtl && this.weatherDtl.weather.length > 0 ? this.weatherDtl?.weather[0]?.description : "-";
  }

}
