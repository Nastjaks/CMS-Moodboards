import {Component, Inject, OnInit, Optional} from '@angular/core';
import {NgbModalConfig, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {Posting} from "../../../models/posting";
import {Moodboard} from "../../../models/moodboard";
import {Auth_Model} from "../../../models/auth_Model";
import {Observable} from "rxjs";
import {StorageService} from "../../../services/storage.service";
import {UserService} from "../../../services/user.service";
import {MoodboardService} from "../../../services/moodboard.service";
import {PostingService} from "../../../services/posting.service";
import {AlertComponent} from "../../general/alert/alert.component";
import {DeletePostingDialogComponent} from "../posting-delete-dialog/delete-posting-dialog.component";


@Component({
  selector: 'app-posting-detail-dialog',
  templateUrl: './posting-detail.component.html',
  styleUrls: ['./posting-detail.component.css'],
  providers: [NgbModalConfig, NgbModal, AlertComponent],
})
export class PostingDetailComponent implements OnInit {

  posting!: Posting;
  postingID!: number;
  currentUser!: Auth_Model;
  moodboard$!: Observable<Moodboard[]>;

  isLoggedIn: boolean = false;
  isOwner: boolean = false;
  postCurrentlyEdit: boolean = false;

  currentTitle!: string;
  currentDescription!: string;
  currentTag!: string;

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private storageService: StorageService,
    private userService: UserService,
    private postingService: PostingService,
    private moodboardService: MoodboardService,
    private alert: AlertComponent,
    public dialogPanel: MatDialog) {
    this.postingID = this.data.postingID;


  }

  ngOnInit(): void {

    this.postingService.getOnePosting(this.postingID).subscribe(posting => {
      this.posting = posting
      this.currentUser = this.storageService.getUser();
      this.isLoggedIn = this.storageService.isLoggedIn();

      if (this.isLoggedIn) {
        this.moodboard$ = this.userService.getAllUserMoodboards(this.currentUser.user.id);

        if (this.posting.attributes.posting_creator.data.id == this.currentUser.user.id) {
          this.isOwner = true;
        }
      }
    });
  }

  addImageToMoodboard(moodboardId: number) {
    if (moodboardId) {
      this.moodboardService.addImgToMoodboard(this.posting.id, moodboardId, this.currentUser.jwt);
      this.alert.openAlert('add' + this.posting.attributes.title + ' to Moodboard');
    } else {
      this.alert.openAlert("You have to select a Moodboard!");
    }
  }

  openDeletePostingDialog() {
    this.dialogPanel.closeAll();

    this.dialogPanel.open(DeletePostingDialogComponent, {
      data: {
        user: this.currentUser,
        posting: this.posting
      }
    });

  }

  startEditPosting() {
    this.postCurrentlyEdit = true;

    this.currentTitle = this.posting.attributes.title;
    this.currentDescription = this.posting.attributes.description;
    this.currentTag = this.posting.attributes.tag;
  }

  cancelChanges() {
    this.postCurrentlyEdit = false;
  }

  saveChanges() {
    if (this.currentTitle.length > 0) {
      this.postingService.editPosting(this.currentTitle, this.currentDescription, this.currentTag, this.posting.id, this.currentUser.jwt)
        .subscribe({
          next: () => {
            this.postCurrentlyEdit = false;
            window.location.reload();
          },
          error: err => {
            console.log(err.error.message);
          }
        });
    } else {
      this.alert.openAlert("You have to add a title");
    }
  }

}
