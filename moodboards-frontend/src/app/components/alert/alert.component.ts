import { Component } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {
  durationInSeconds = 5;
  constructor(private _snackBar: MatSnackBar) {
  }

  /**
  openSnackBar() {
    this._snackBar.openFromComponent(AlertComponent, {
      duration: this.durationInSeconds * 1000,
    })
  }**/

}
