import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ResumeComponent } from './resume/resume.component';
import { InfoCardComponent } from './info-card/info-card.component';
import { EducationCardComponent } from './education-card/education-card.component';
import { PortfolioCardComponent } from './portfolio-card/portfolio-card.component';
import { ExperienceCardComponent } from './experience-card/experience-card.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { FireService } from './services/fire.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { FlashMessagesComponent } from './flash-messages/flash-messages.component';
import { FlashService } from './services/flash.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    LoginComponent,
    DashboardComponent,
    ResumeComponent,
    InfoCardComponent,
    EducationCardComponent,
    PortfolioCardComponent,
    ExperienceCardComponent,
    RegisterComponent,
    FlashMessagesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    FireService,
    FlashService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
