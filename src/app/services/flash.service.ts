import { Injectable } from '@angular/core';
import { FlashMessage } from './flash.model';

@Injectable({
  providedIn: 'root'
})
export class FlashService {

  public messages: Array<FlashMessage> = [];

  constructor() { }

  createFlashMessage(message: string, style?: string) {
    let newFlashMessage = new FlashMessage(message, style)
    this.messages.push(newFlashMessage);
  }

  dismissFlashMessage(index: number) {
    let message: FlashMessage = this.messages[index]
    message.dismiss();
    this.messages.splice(index, 1);
  }

  getMessages() {
    return this.messages
  }

  dismissAllMessages() {
    this.messages.forEach(
      message => {
        message.dismiss()
        this.messages.splice(0, this.messages.length)
      }
    )
  }

}
