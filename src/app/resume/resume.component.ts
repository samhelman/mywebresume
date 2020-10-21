import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { FireService } from '../services/fire.service';
import { UserData } from '../services/user.model';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css']
})
export class ResumeComponent implements OnInit {

  public resume: UserData;

  constructor(
    private titleService: Title,
    private route: ActivatedRoute,
    private fire: FireService
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('MyWebResume');
    if (document.getElementById('nav')) {
      document.getElementById('nav').style.display = 'none';
    }
    let username = this.route.snapshot.paramMap.get('username');
    this.getUserId(username);
  }

  scrollTo(ref) {
    const target = document.getElementById(ref);
    target.scrollIntoView({behavior:'smooth', block: 'center'});
  }

  getUserId(username: String) {
    this.fire
      .getUserId(username)
      .subscribe(res => {
        this.getUserData(res[0]['uid'])
      });
  }

  getUserData(uid) {
    this.fire
      .getUserData(uid)
      .subscribe(res => {
        this.resume = res[0];
        this.titleService.setTitle(this.resume.info.name);
      })
  }

}
