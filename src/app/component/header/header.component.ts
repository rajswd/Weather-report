import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output()
  headerEvent:EventEmitter<any> = new EventEmitter();
  isTimerStarted:boolean = false;

  constructor() { }

  ngOnInit(): void {
  }


  startTimer(){
    this.headerEvent.emit({flag:true});
    this.isTimerStarted = true;
  }

  stopTimer(){
    this.headerEvent.emit({flag:false});
    this.isTimerStarted = false;
  }

}
