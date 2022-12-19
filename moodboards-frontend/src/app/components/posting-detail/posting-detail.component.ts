import {Component, Inject, Input, Optional} from '@angular/core';
import {Posting} from "../../models/posting";
import {NgbModalConfig, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Auth_Model} from "../../models/auth_Model";
import {StorageService} from "../../services/storage.service";
import {Observable} from "rxjs";
import {Moodboard} from "../../models/moodboard";
import {UserService} from "../../services/user.service";
import {MoodboardService} from "../../services/moodboard.service";


@Component({
  selector: 'app-posting-detail',
  templateUrl: './posting-detail.component.html',
  styleUrls: ['./posting-detail.component.css'],
  providers: [NgbModalConfig, NgbModal],
})
export class PostingDetailComponent {

  posting: Posting;
  currentUser!: Auth_Model;
  moodboard$!: Observable<Moodboard[]>;
  isLoggedIn = false;

  constructor(public dialogRef: MatDialogRef<PostingDetailComponent>,
              @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
              private storageService: StorageService,
              private userService: UserService,
              private moodboardService: MoodboardService,) {
    this.posting = data.posting;
    this.currentUser = this.storageService.getUser();
    this.isLoggedIn = this.storageService.isLoggedIn();
    this.moodboard$ = this.userService.getAllUserMoodbards(this.currentUser.user.id);
  }


  addImageToMoodboard(imgId: number, moodboardId: string) {
    if (moodboardId.length > 0){
      console.log('Try to add a image: ' + imgId + ' to moodboard with id: ' + moodboardId);
      this.moodboardService.addImgToMoodboard(imgId, moodboardId );
    } else {
      console.log("[ERROR]cant add image, select a moodboard");
    }

  }

  closeDialog() {
    this.dialogRef.close(this.posting);
  }
}
