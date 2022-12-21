import {Component, OnInit} from '@angular/core';
import {Moodboard} from "../../models/moodboard";
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import {map, Observable} from "rxjs";
import {Posting} from "../../models/posting";
import {PostingService} from "../../services/posting.service";
import {MatDialog} from "@angular/material/dialog";
import {DeleteMoodboardDialogComponent} from "../delete-moodboard-dialog/delete-moodboard-dialog.component";
import {Auth_Model} from "../../models/auth_Model";
import {StorageService} from "../../services/storage.service";
import {MoodboardService} from "../../services/moodboard.service";

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
  privateBoard: boolean = false;

  constructor(private router: Router, private location: Location, private storageService: StorageService,
              private postingService: PostingService, private moodboardService: MoodboardService, public dialogPanel: MatDialog) {
    this.currentUser = this.storageService.getUser();
    this.isLoggedIn = this.storageService.isLoggedIn();
    this.moodboard$ = this.moodboardService.getOneMoodboard(this.currentUser.user.id).pipe(
      map((moodboard) =>
        this.moodboard = moodboard
      )
    );

    this.moodboard = history.state.moodboard;
    this.privateBoard = this.moodboard.attributes.private;
    this.moodboardCreatorId = this.moodboard.attributes.moodboard_creator.data.id;
    if (this.moodboardCreatorId == this.currentUser.user.id) {
      this.isOwner = true;
    }
  }

  ngOnInit(): void {
    //this.moodboard = history.state.moodboard;
    // this.privateBoard = this.moodboard.attributes.private;

    this.postingsInMoodboard$ = this.postingService.getAllPostingsInMoodboard(this.moodboard.id);
  }

  changeVisibilityPublic() {
    this.moodboardService.makeMoodboardPrivate(this.moodboard, this.currentUser.jwt, false)
      .subscribe({
        next: data => {
          this.privateBoard = false;
          this.router.navigate(["/moodboard/" + this.moodboard.id]).then(r => window.location.reload())
        },
        error: err => {
          console.log(err.error.message);
        }
      });
  }

  changeVisibilityPrivate() {
    this.moodboardService.makeMoodboardPrivate(this.moodboard, this.currentUser.jwt, true)
      .subscribe({
        next: data => {
          this.privateBoard = true;
          this.router.navigate(["/moodboard/" + this.moodboard.id]).then(r => window.location.reload())
        },
        error: err => {
          console.log(err.error.message);
        }
      });
  }

  checkDelete() {
    this.dialogPanel.open(DeleteMoodboardDialogComponent, {
      width: '250px',
      height: '250px',
      data: {
        user: this.currentUser,
        moodboard: this.moodboard
      }
    }).afterClosed().subscribe(
      result => {
        //this.location.go('/');
      }
    );
  }

  editMoodboardData() {

  }
}
