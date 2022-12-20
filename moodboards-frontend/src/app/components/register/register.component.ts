import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AlertComponent} from "../alert/alert.component";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [AlertComponent],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private alert: AlertComponent) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      password_re: ['', Validators.required]
    });

  }

  ngOnInit(): void {
  }

  register() {
    const {username, email, password, password_re} = this.form.value;

    if (username && email && password && password_re) {
      if ((password == password_re)) {
        this.authService.register(username, email, password)
          .subscribe({
            next: data => {
              console.log("User is logged in");
              this.authService.login(username, password).subscribe(res =>
                this.router.navigate(['/profile']).then(r =>
                  window.location.reload()
                )
              );
            },
            error: err => {
              this.alert.openAlert(err.error.error.message);
            }
          });

      } else {
        this.alert.openAlert("Passwords not equal");
      }
    } else {
      this.alert.openAlert("Please enter Input");
    }
  }


}
