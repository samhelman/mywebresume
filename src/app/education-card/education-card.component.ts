import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-education-card',
  templateUrl: './education-card.component.html',
  styleUrls: ['./education-card.component.css']
})
export class EducationCardComponent implements OnInit {

  @Input() education;

  constructor() { }

  ngOnInit(): void {
  }

}
