import {Component, OnInit} from '@angular/core';
import {Moodboard} from "../../models/moodboard";
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import {map, Observable} from "rxjs";
import {Posting} from "../../models/posting";
import {PostingService} from "../../services/posting.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {DeleteMoodboardDialogComponent} from "../delete-moodboard-dialog/delete-moodboard-dialog.component";
import {Auth_Model} from "../../models/auth_Model";
import {StorageService} from "../../services/storage.service";
import {MoodboardService} from "../../services/moodboard.service";
import {MatSlideToggleChange} from "@angular/material/slide-toggle";

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
  checked: boolean = false;
  result: string = "public";

  constructor(private router: Router, private location: Location, private storageService: StorageService,
              private postingService: PostingService, private moodboardService: MoodboardService, public dialogPanel: MatDialog) {

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





    //TODO: OPEN MOODBOARD ON RELOAD
  }

  ngOnInit(): void {
    //this.moodboard = history.state.moodboard;
    // this.privateBoard = this.moodboard.attributes.private;

    this.postingsInMoodboard$ = this.postingService.getAllPostingsInMoodboard(this.moodboard.id);
  }

  checkDelete() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '250px';
    dialogConfig.height = '250px';
    dialogConfig.data = {
      user: this.currentUser,
      moodboard: this.moodboard
    };

    this.dialogPanel.open(DeleteMoodboardDialogComponent, dialogConfig).afterClosed().subscribe(
      result => {
        //this.location.go('/');
      }
    );
  }

  editMoodboardData() {

  }

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
          this.router.navigate(["/moodboard/" + this.moodboard.id]).then(r => window.location.reload())
        },
        error: err => {
          console.log(err.error.message);
        }
      });
  }
}
