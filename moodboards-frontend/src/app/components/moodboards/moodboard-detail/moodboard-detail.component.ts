import {Component, OnInit} from '@angular/core';
import {Moodboard} from "../../../models/moodboard";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {map, Observable} from "rxjs";
import {Posting} from "../../../models/posting";
import {PostingService} from "../../../services/posting.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {DeleteMoodboardDialogComponent} from "../moodboard-delete-dialog/delete-moodboard-dialog.component";
import {Auth_Model} from "../../../models/auth_Model";
import {StorageService} from "../../../services/storage.service";
import {MoodboardService} from "../../../services/moodboard.service";
import {MoodboardEditDialogComponent} from "../moodboard-edit-dialog/moodboard-edit-dialog.component";

@Component({
  selector: 'app-moodboard-detail',
  templateUrl: './moodboard-detail.component.html',
  styleUrls: ['./moodboard-detail.component.css']
})
export class MoodboardDetailComponent implements OnInit {

  currentUser!: Auth_Model;

  moodboard$!: Observable<Moodboard>;
  moodboard!: Moodboard;
  postingsInMoodboard$!: Observable<Posting[]>;
  isLoggedIn = false;
  isOwner = false;
  moodboardCreatorId: number = 1;
  //checked: boolean = false;
  //result: string = "public";
  dialogConfig = new MatDialogConfig();

  constructor(private router: Router,
              private location: Location,
              private storageService: StorageService,
              private postingService: PostingService,
              private moodboardService: MoodboardService,
              public dialogPanel: MatDialog,
              private route: ActivatedRoute,) {

    this.dialogConfig.data = {
      user: this.currentUser,
      moodboard: this.moodboard
    };

    this.moodboard = history.state.moodboard;
    this.moodboardCreatorId = this.moodboard.attributes.moodboard_creator.data.id;

    this.currentUser = this.storageService.getUser();
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      if (this.moodboardCreatorId == this.currentUser.user.id) {
        this.isOwner = true;
      }
      this.moodboard$ = this.moodboardService.getOneMoodboard(this.currentUser.user.id).pipe(
        map((moodboard) =>
          this.moodboard = moodboard
        )
      );
    }


  }

  ngOnInit(): void {
      this.postingsInMoodboard$ = this.postingService.getAllPostingsInMoodboard(this.moodboard.id);
    //TODO: OPEN MOODBOARD ON RELOAD
  }

  openDeleteDialog() {
    this.dialogPanel.open(DeleteMoodboardDialogComponent, this.dialogConfig);
  }

  openEditMoodboardDialog() {
    this.dialogPanel.open(MoodboardEditDialogComponent, this.dialogConfig)
  }

  /**
  slideToggleChange(event: MatSlideToggleChange) {
    this.checked = event.source.checked;
    if (this.checked) {
      this.result = "private";
      this.changeMoodboardVisibility(true);
    } else {
      this.result = "public";
      this.changeMoodboardVisibility(false);
    }
  }

  changeMoodboardVisibility(change: boolean) {
    this.moodboardService.changeVisibility(this.moodboard, this.currentUser.jwt, change)
      .subscribe({
        next: data => {
          //this.router.navigate(["/moodboard/" + this.moodboard.id]).then(r => window.location.reload())
        },
        error: err => {
          console.log(err.error.message);
        }
      });
  }**/
}
