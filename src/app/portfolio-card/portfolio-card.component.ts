import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-portfolio-card',
  templateUrl: './portfolio-card.component.html',
  styleUrls: ['./portfolio-card.component.css']
})
export class PortfolioCardComponent implements OnInit {

  @Input() portfolio;

  constructor() { }

  ngOnInit(): void {
  }

}
