export class FlashMessage {
  public message: string;
  public style: string;
  public dismissed: boolean;
  
  constructor(message: string, style?: string) {
    this.message = message;
    this.style = style || 'info';
    this.dismissed = false;
  }

  dismiss() {
    this.dismissed = true
  }
}