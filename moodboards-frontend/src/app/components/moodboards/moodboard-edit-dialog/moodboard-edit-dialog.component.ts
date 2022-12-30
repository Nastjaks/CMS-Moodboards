import {Component, Inject, Optional} from '@angular/core';
import {MoodboardService} from "../../../services/moodboard.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Auth_Model} from "../../../models/auth_Model";
import {AlertComponent} from "../../general/alert/alert.component";

@Component({
  selector: 'app-moodboard-edit-dialog',
  templateUrl: './moodboard-edit-dialog.component.html',
  styleUrls: ['./moodboard-edit-dialog.component.css'],
  providers: [AlertComponent]
})
export class MoodboardEditDialogComponent {
  user!: Auth_Model;
  newTitle!: string;
  newDescription!: string;
  newVisibilityPrivate!: boolean;

  constructor(private dialogRef: MatDialogRef<MoodboardEditDialogComponent>,
              private moodboardService: MoodboardService,
              @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
              private alert: AlertComponent,) {
    this.user = data.user;
    this.newTitle = this.data.moodboard.attributes.title;
    this.newDescription = this.data.moodboard.attributes.description;
    this.newVisibilityPrivate = this.data.moodboard.attributes.private;
  }

  updateMoodboard() {
    if (this.data.moodboard.attributes.title.length > 0){
      const moodboard: {} = {
        title: this.newTitle,
        description: this.newDescription,
        visibilityPrivate: this.newVisibilityPrivate,
      }

      this.moodboardService.updateMoodboard(this.data.moodboard.id, moodboard, this.user.jwt)
      this.alert.openAlert("Save chages");
      this.dialogRef.close();

    } else {
      this.alert.openAlert("Please enter a title");
    }
  }
}
