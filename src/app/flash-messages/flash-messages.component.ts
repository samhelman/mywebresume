import { Component, OnInit } from '@angular/core';
import { FlashMessage } from '../services/flash.model';
import { FlashService } from '../services/flash.service';

@Component({
  selector: 'app-flash-messages',
  templateUrl: './flash-messages.component.html',
  styleUrls: ['./flash-messages.component.css']
})
export class FlashMessagesComponent implements OnInit {

  public messages: Array<FlashMessage>;
  public home: boolean;

  constructor(
    private flashService: FlashService
  ) { }

  ngOnInit(): void {
    this.messages = this.flashService.getMessages()
    if (this.messages.length > 5) {
      this.messages.slice(-5);
    };
  }

  newFlashMessage(message: string, style?: string) {
    this.flashService.createFlashMessage(message, style)
  }

  dismissFlashMessage(index: number) {
    this.flashService.dismissFlashMessage(index);
  }

}
