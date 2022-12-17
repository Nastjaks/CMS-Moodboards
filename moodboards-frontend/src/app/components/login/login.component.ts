import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {StorageService} from "../../services/storage.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  isLoggedIn = false;
  isLoginFailed = false;
  isUsernameFalse = false;
  isPasswordFalse = false;
  errorMessage = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private storageService: StorageService, private router: Router) {
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

    if (username.length >= 3 && username.length <= 20 && password.length >= 6) {
      this.authService.login(username, password)
        .subscribe({
          next: data => {
            this.isLoginFailed = false;
            this.isUsernameFalse = false;
            this.isPasswordFalse = false;
            this.isLoggedIn = true;
            this.router.navigate(['/profile']).then(r =>
              this.reloadPage()
            );
          },
          error: err => {
            this.errorMessage = err.error.message;
            this.isLoginFailed = true;
          }
        });
    }else if (username.length == 0 || 3 < username.length || username.length >= 20) {
      this.isUsernameFalse = true;
    }else if (password.length == 0 || 6 < password.length) {
      this.isPasswordFalse = true;
    }
  }

  reloadPage(): void {
    window.location.reload();
  }
}
