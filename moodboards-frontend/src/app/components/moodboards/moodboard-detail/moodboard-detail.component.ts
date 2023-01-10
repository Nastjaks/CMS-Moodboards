import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {Observable} from "rxjs";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {Moodboard} from "../../../models/moodboard";
import {Posting} from "../../../models/posting";
import {Auth_Model} from "../../../models/auth_Model";
import {PostingService} from "../../../services/posting.service";
import {StorageService} from "../../../services/storage.service";
import {MoodboardService} from "../../../services/moodboard.service";
import {DeleteMoodboardDialogComponent} from "../moodboard-delete-dialog/delete-moodboard-dialog.component";
import {MoodboardEditDialogComponent} from "../moodboard-edit-dialog/moodboard-edit-dialog.component";
import {PostingDetailComponent} from "../../posting/posting-detail-dialog/posting-detail.component";
import {AlertComponent} from "../../general/alert/alert.component";

@Component({
  selector: 'app-moodboard-detail',
  templateUrl: './moodboard-detail.component.html',
  styleUrls: ['./moodboard-detail.component.css'],
  providers: [AlertComponent],
})
export class MoodboardDetailComponent implements OnInit {

  currentUser!: Auth_Model;
  moodboard!: Moodboard;
  postingsInMoodboard$!: Observable<Posting[]>;
  isLoggedIn = false;
  isOwner = false;
  moodboardCreatorId: number = 1;
  dialogConfig = new MatDialogConfig();
  moodboard_Id!: number;

  constructor(private router: Router,
              private location: Location,
              private storageService: StorageService,
              private postingService: PostingService,
              private moodboardService: MoodboardService,
              public dialogPanel: MatDialog,
              private route: ActivatedRoute) {

  }

  ngOnInit(): void {

    this.currentUser = this.storageService.getUser();
    this.isLoggedIn = this.storageService.isLoggedIn();

    this.route.params.subscribe((params: any) => {
      this.moodboardService.getOneMoodboard(params.id).subscribe(
        moodboard => {
          this.moodboard = moodboard
          this.moodboardCreatorId = this.moodboard.attributes.moodboard_creator.data.id;
          this.postingsInMoodboard$ = this.postingService.getAllPostingsInMoodboard(this.moodboard.id);

          if (this.isLoggedIn) {
            if (this.moodboardCreatorId == this.currentUser.user.id) {
              this.isOwner = true;
            }
          }
          if (params.id != null) {
            this.moodboard_Id = params.id;
          }
          if (params.poId != null) {
            this.showPostDetails(params.poId);
          }
        }
      );
    })
  }

  showPostDetails(poId: number) {
    this.location.go("/moodboard/" + this.moodboard_Id + '/posting/' + poId)

    this.dialogPanel.open(PostingDetailComponent, {
      data: {
        postingID: poId
      }
    }).afterClosed().subscribe(() => {
      this.location.go("/moodboard/" + this.moodboard_Id)
    });
  }

  openEditMoodboardDialog() {
    this.dialogConfig.data = {user: this.currentUser, moodboard: this.moodboard};
    this.dialogPanel.open(MoodboardEditDialogComponent, this.dialogConfig)
  }

  removeImgFromMoodboard(imgId: number) {
    this.moodboardService.removeImgFromMoodboard(imgId, this.moodboard.id, this.currentUser.jwt)
  }

  openDeleteDialog() {
    this.dialogConfig.data = {user: this.currentUser, moodboard: this.moodboard};
    this.dialogPanel.open(DeleteMoodboardDialogComponent, this.dialogConfig);
  }
}
