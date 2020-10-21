import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FireService } from '../services/fire.service';
import { FlashService } from '../services/flash.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public loggedIn: boolean;

  constructor(
    private titleService: Title,
    private flashService: FlashService,
    private fire: FireService,
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('MyWebResume')
    this.flashService.dismissAllMessages()
    this.fire.getCurrentUser().then(
      response => {
        this.loggedIn = (response) ? true : false;
      }
    )
  }

}
