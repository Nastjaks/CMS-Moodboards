import {Component, Inject, Optional} from '@angular/core';
import {Posting} from "../../../models/posting";
import {NgbModalConfig, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Auth_Model} from "../../../models/auth_Model";
import {StorageService} from "../../../services/storage.service";
import {Observable} from "rxjs";
import {Moodboard} from "../../../models/moodboard";
import {UserService} from "../../../services/user.service";
import {MoodboardService} from "../../../services/moodboard.service";
import {AlertComponent} from "../../general/alert/alert.component";
import {PostingService} from "../../../services/posting.service";
import {DeletePostingDialogComponent} from "../posting-delete-dialog/delete-posting-dialog.component";


@Component({
  selector: 'app-posting-detail-dialog',
  templateUrl: './posting-detail.component.html',
  styleUrls: ['./posting-detail.component.css'],
  providers: [NgbModalConfig, NgbModal, AlertComponent],
})
export class PostingDetailComponent {

  posting: Posting;
  currentUser!: Auth_Model;
  moodboard$!: Observable<Moodboard[]>;

  isLoggedIn: boolean = false;
  isOwner: boolean = false;
  postCurrentlyEdit: boolean = false;

  //currentTitle!: string;
  //currentDescription!: string;
  //currentTag!: string;

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

  addImageToMoodboard(moodboardId: number) {
    if (moodboardId) {
      this.moodboardService.addImgToMoodboard(this.posting.id, moodboardId, this.currentUser.jwt);
      this.alert.openAlert('add' + this.posting.id + ' to moodboard' + moodboardId);
    } else {
      this.alert.openAlert("You have to select a Moodboard!");
    }
  }

  openDeletePostingDialog() {
    this.dialogPanel.closeAll();

    /**
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      user: this.currentUser,
      posting: this.posting
    };

    this.dialogPanel.open(DeletePostingDialogComponent, dialogConfig).afterClosed().subscribe(
      result => {
        //this.location.go('/');
      }
    );*/

    this.dialogPanel.open(DeletePostingDialogComponent, {
      data: {
        user: this.currentUser,
        posting: this.posting
      }
    });

  }

  startEditPosting() {
    this.postCurrentlyEdit = true;

    //this.currentTitle = this.posting.attributes.title;
    //this.currentDescription = this.posting.attributes.description;
    //this.currentTag = this.posting.attributes.tag;
  }

  cancelChanges() {
    this.postCurrentlyEdit = false;
  }

  saveChanges() {
    /*
    let title = (<HTMLInputElement>document.getElementById("title")).value;
    let description = (<HTMLInputElement>document.getElementById("description")).value;
    let tag = (<HTMLInputElement>document.getElementById("tag")).value;


    let newTitle = (<HTMLInputElement>document.getElementById("title")).value;
    let newDescription = (<HTMLInputElement>document.getElementById("description")).value;
    let newTag = (<HTMLInputElement>document.getElementById("tag")).value;
  */

    if (this.posting.attributes.title && this.posting.attributes.description) {
      this.postingService.editPosting(this.posting.attributes.title, this.posting.attributes.description, this.posting.attributes.tag, this.posting.id, this.currentUser.jwt)
        .subscribe({
          next: data => {
            this.postCurrentlyEdit = false;
            window.location.reload();
          },
          error: err => {
            console.log(err.error.message);
          }
        });
    }
  }


}
