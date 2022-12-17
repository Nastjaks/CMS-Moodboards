import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;

  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  ngOnInit(): void {
  }

  register() {
    const {username, email, password} = this.form.value;

    if (username && email && password) {
      this.authService.register(username, email, password)
        .subscribe(  {
          next: data => {
            console.log("User is logged in");
            this.isSuccessful = true;
            this.isSignUpFailed = false;
            this.router.navigate(['/login']);
          },
            error: err => {
            this.errorMessage = err.error.message;
            this.isSignUpFailed = true;
          }
      });
    }
  }
}
