import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { DialogueComponent } from '../dialogue/dialogue.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input()
  cityReport:any;

  @Output()
  onDeleteWidget:EventEmitter<any> = new EventEmitter();

  @Output()
  onWeatherForcast:EventEmitter<any> = new EventEmitter();


  constructor() { }

  ngOnInit(): void {
  }

  deleteCity(){
    this.onDeleteWidget.emit({key:this.cityReport.key, name:this.cityReport.name});
  }

  openWeatherDetail() {
    this.onWeatherForcast.emit(this.cityReport.key);
  }

}
