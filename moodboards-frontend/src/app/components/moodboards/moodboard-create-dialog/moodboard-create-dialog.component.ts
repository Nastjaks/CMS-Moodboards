import {Component, Inject, Optional} from '@angular/core';
import {AlertComponent} from "../../general/alert/alert.component";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Auth_Model} from "../../../models/auth_Model";
import {MoodboardService} from "../../../services/moodboard.service";

@Component({
  selector: 'app-moodboard-create-dialog',
  templateUrl: './moodboard-create-dialog.component.html',
  styleUrls: ['./moodboard-create-dialog.component.css'],
  providers: [AlertComponent]
})

export class MoodboardCreateDialogComponent {

  user!: Auth_Model;
  title!: string;
  description!: string;
  visibility!: string;

  constructor(private dialogRef: MatDialogRef<MoodboardCreateDialogComponent>,
              @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
              private alert: AlertComponent,
              private moodboardService: MoodboardService) {
    this.user = data.user;
  }

  createMoodboard() {
    if (this.title) {
      const moodboard: {} = {
        title: this.title,
        description: this.description,
        visibilityPrivate: this.visibility,
        moodboard_creator: this.user.user.id
      }

      this.moodboardService.createMoodboard(moodboard, this.user.jwt)

    } else {
      this.alert.openAlert("Please enter a title");
    }
  }
}
