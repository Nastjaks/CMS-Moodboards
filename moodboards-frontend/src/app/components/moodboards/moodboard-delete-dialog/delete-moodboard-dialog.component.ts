import {Component, Inject, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Auth_Model} from "../../../models/auth_Model";
import {Moodboard} from "../../../models/moodboard";
import {MoodboardService} from "../../../services/moodboard.service";
import {Router} from "@angular/router";
import {AlertComponent} from "../../general/alert/alert.component";

@Component({
  selector: 'app-moodboard-delete-dialog',
  templateUrl: './delete-moodboard-dialog.component.html',
  styleUrls: ['./delete-moodboard-dialog.component.css'],
  providers: [AlertComponent]
})
export class DeleteMoodboardDialogComponent {
  currentUser!: Auth_Model;
  moodboard!: Moodboard;

  constructor(private moodboardService: MoodboardService,
              @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
              private router: Router,
              private alert: AlertComponent,
              public dialogPanel: MatDialogRef<DeleteMoodboardDialogComponent>) {
    this.currentUser = this.data.user;
    this.moodboard = this.data.moodboard;
  }

  deleteMoodboard() {
    this.moodboardService.deleteMoodboard(this.moodboard.id, this.currentUser.jwt).subscribe(() => {
      this.router.navigate(["/profile"]).then(() => {
        this.dialogPanel.close();
        this.alert.openAlert("Deleted Moodboard" );
      });
    });
  }
}
