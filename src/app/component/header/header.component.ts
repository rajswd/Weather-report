import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output()
  headerEvent: EventEmitter<any> = new EventEmitter();
  isTimerStarted = false;

  constructor() { }

  ngOnInit(): void {
  }


  startTimer(): void{
    this.headerEvent.emit({flag: true});
    this.isTimerStarted = true;
  }

  stopTimer(): void{
    this.headerEvent.emit({flag: false});
    this.isTimerStarted = false;
  }

}
