import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FireService } from '../services/fire.service';
import { FlashService } from '../services/flash.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public registerForm;
  public errors: boolean;
  public errorMessage: String;

  constructor(
    private titleService: Title,
    private formBuilder: FormBuilder,
    private router: Router,
    private fire: FireService,
    private flashService: FlashService
  ) {
    this.registerForm = this.formBuilder.group({
      email: '',
      password: '',
      confirm: ''
    })
  }

  ngOnInit(): void {
    this.titleService.setTitle('MyWebResume - Register')
  }

  resetErrors() {
    this.errors = false
  }

  onSubmit(creds) {
    if (creds.password == creds.confirm) {
      this.fire.register(creds.email, creds.password).catch(
        error => {
          console.log(error)
          if (error.code == 'auth/invalid-email') {
            this.flashService.createFlashMessage(`That email address was invalid.`, 'danger')
          }
          if (error.code == 'auth/weak-password' || error.code == 'auth/wrong-password') {
            this.flashService.createFlashMessage(`Your password must be at least 6 characters long.`, 'danger')
          }
          if (error.code == 'auth/email-alread-in-use' || error.code == 'auth/wrong-password') {
            this.flashService.createFlashMessage(`That email address is alread in use.`, 'danger')
          }
        }
      ).then(
        response => {
          let uid = response['user']['uid']
          let email = response['user']['email']
          this.fire.setUpUserFirestore(uid, email)
          this.flashService.createFlashMessage(`Account created for '${creds.email}!`, 'success')
          this.router.navigate(['/login'])
        }
      );
    } else {
      this.flashService.createFlashMessage(`That password fields must match.`, 'danger')
    }
  }

}
