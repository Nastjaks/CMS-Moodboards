import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {StorageService} from "../../services/storage.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AlertComponent} from "../alert/alert.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AlertComponent],
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  isLoggedIn = false;
  isLoginFailed = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private storageService: StorageService, private router: Router, private alert: AlertComponent) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
    }
  }

  login(): void {
    const {username, password} = this.form.value;

    if (username.length > 0 || password.length > 0) {
      this.authService.login(username, password)
        .subscribe({
          next: data => {
            this.isLoginFailed = false;
            this.isLoggedIn = true;
            this.router.navigate(['/profile']).then(r =>
              window.location.reload()
            );
          },
          error: err => {
            this.alert.openAlert(err.error.error.message);
            this.isLoginFailed = true;
          }
        });
    } else {
      this.alert.openAlert("Incorrect input");
    }
  }


}
