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
import {NgbModal, NgbModalConfig} from "@ng-bootstrap/ng-bootstrap";

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
  //checked: boolean = false;
  //result: string = "public";
  dialogConfig = new MatDialogConfig();

  mood!: Moodboard //TODO GET SINGLE MOODBOARD BY PARAM

  constructor(private router: Router,
              private location: Location,
              private storageService: StorageService,
              private postingService: PostingService,
              private moodboardService: MoodboardService,
              public dialogPanel: MatDialog,
              private route: ActivatedRoute,
              private alert: AlertComponent,
  ) {
    /*
     this.moodboard$ = this.moodboardService.getOneMoodboard(this.currentUser.user.id).pipe(
       map((moodboard) =>
         this.moodboard = moodboard
       )
     );*/

  }

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      if (params.id != null) {
        this.moodboardService.getOneMoodboard(params.id).subscribe(moodboard => this.moodboard = moodboard);
      }
    })

    if (history.state.moodboard) {
      this.moodboard = history.state.moodboard;
    }
    this.postingsInMoodboard$ = this.postingService.getAllPostingsInMoodboard(this.moodboard.id);
    this.moodboardCreatorId = this.moodboard.attributes.moodboard_creator.data.id;

    this.currentUser = this.storageService.getUser();
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      if (this.moodboardCreatorId == this.currentUser.user.id) {
        this.isOwner = true;
      }
    }


    this.dialogConfig.data = {user: this.currentUser, moodboard: this.moodboard};
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

  showPostDetails(post: Posting) {
    this.dialogPanel.open(PostingDetailComponent, {
      data: {
        posting: post
      }
    });
  }

  removeImgFromMoodboard(imgId: number) {
    console.log(this.moodboard.id + " " + imgId);
    this.moodboardService.removeImgFromMoodboard(imgId, this.moodboard.id, this.currentUser.jwt);
    this.alert.openAlert('remove posting from Moodboard');
  }
}
