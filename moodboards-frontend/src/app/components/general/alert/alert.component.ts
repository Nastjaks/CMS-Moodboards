import { Component } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {

  constructor(private _snackBar: MatSnackBar) {
  }

  openAlert(message: string) {
    this._snackBar.open(message, 'X',{duration: 5000});
  }

}
