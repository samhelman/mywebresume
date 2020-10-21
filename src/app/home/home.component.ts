import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FlashService } from '../services/flash.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private titleService: Title,
    private flashService: FlashService
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('MyWebResume')
    this.flashService.dismissAllMessages()
  }

}
