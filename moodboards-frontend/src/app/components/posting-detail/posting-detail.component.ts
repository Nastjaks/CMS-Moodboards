import {Component, Inject, Optional} from '@angular/core';
import {Posting} from "../../models/posting";
import {NgbModalConfig, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";
import {Auth_Model} from "../../models/auth_Model";
import {StorageService} from "../../services/storage.service";
import {Observable} from "rxjs";
import {Moodboard} from "../../models/moodboard";
import {UserService} from "../../services/user.service";
import {MoodboardService} from "../../services/moodboard.service";
import {AlertComponent} from "../alert/alert.component";
import {PostingService} from "../../services/posting.service";
import {DeletePostingDialogComponent} from "../delete-posting-dialog/delete-posting-dialog.component";


@Component({
  selector: 'app-posting-detail',
  templateUrl: './posting-detail.component.html',
  styleUrls: ['./posting-detail.component.css'],
  providers: [NgbModalConfig, NgbModal, AlertComponent],
})
export class PostingDetailComponent {

  posting: Posting;
  isLoggedIn = false;
  currentUser!: Auth_Model;
  moodboard$!: Observable<Moodboard[]>;
  isOwner = false;


  constructor(public dialogRef: MatDialogRef<PostingDetailComponent>,
              @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
              private storageService: StorageService,
              private userService: UserService,
              private postingService: PostingService,
              private moodboardService: MoodboardService,
              private alert: AlertComponent,
              public dialogPanel: MatDialog) {
    this.posting = data.posting;
    this.currentUser = this.storageService.getUser();
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      this.moodboard$ = this.userService.getAllUserMoodboards(this.currentUser.user.id);

      if (this.posting.attributes.posting_creator.data.id == this.currentUser.user.id) {
        this.isOwner = true;
      }
    }
    //TODO: OPEN POSTING ON RELOAD
  }


  addImageToMoodboard(imgId: number, moodboardId: string) {
    if (moodboardId != "select") {
      this.moodboardService.addImgToMoodboard(imgId, moodboardId); //TODO: ADD FUNCTION
      this.alert.openAlert('Try to add a image: ' + imgId + ' to moodboard with id: ' + moodboardId);
    } else {
      this.alert.openAlert("You have to select a Moodboard!");
    }
  }

  deletePosting() {
    this.alert.openAlert("TRY TO DELETE POSTING: " + this.posting.id);
    this.dialogPanel.closeAll();

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '250px';
    dialogConfig.height = '250px';
    dialogConfig.data = {
      user: this.currentUser,
      posting: this.posting
    };

    this.dialogPanel.open(DeletePostingDialogComponent, dialogConfig).afterClosed().subscribe(
      result => {
        //this.location.go('/');
      }
    );
  }

  editPosting() {
    this.alert.openAlert("TRY TO EDIT POSTING: " + this.posting.id); //TODO: EDIT FUNCTION
  }
}
