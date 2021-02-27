import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ContentRef } from '@ng-bootstrap/ng-bootstrap/util/popup';

@Component({
  selector: 'app-dialogue',
  templateUrl: './dialogue.component.html',
  styleUrls: ['./dialogue.component.scss']
})
export class DialogueComponent implements OnInit {

  @ViewChild('contentDlg') private modalContent?: TemplateRef<DialogueComponent>

  cityReport:any;

  constructor(private config: NgbModalConfig, private modalService2: NgbModal){
    
    config.keyboard = false;
    config.animation = true;
    config.centered = true;
    config.keyboard = true;
  }

  ngOnInit(): void {
    
  }
  
  openDialogue(selectedCity:any) {
    this.cityReport = selectedCity;
    this.modalService2.open(this.modalContent, this.config);
  }

}
