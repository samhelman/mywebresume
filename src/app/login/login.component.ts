import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { FireService } from '../services/fire.service';
import { FlashService } from '../services/flash.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm;
  public errorMessage: String;

  constructor(
    private titleService: Title,
    public fire: FireService,
    private formBuilder: FormBuilder,
    private flashService: FlashService
  ) {
    this.loginForm = this.formBuilder.group({
      email: '',
      password: ''
    })
  }

  ngOnInit(): void {
    this.titleService.setTitle('MyWebResume - Login')
  }

  onSubmit(creds) {
    this.fire.login(creds.email, creds.password).catch(error => {
      if (error.code == 'auth/invalid-email') {
        this.flashService.createFlashMessage(`That email address was invalid.`, 'danger')
      }
      if (error.code == 'auth/wrong-password' || error.code == 'auth/wrong-password') {
        this.flashService.createFlashMessage(`That password was incorrect.`, 'danger')
      }
      if (error.code == 'auth/user-not-found') {
        this.flashService.createFlashMessage(`No account was found for '${creds.email}'.`, 'danger')
      }
      this.loginForm.reset()
    });
  }

  resetErrors() {
    this.errorMessage = ''
  }
}
