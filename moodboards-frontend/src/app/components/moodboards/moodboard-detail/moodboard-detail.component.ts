import {AfterViewInit, Component, OnInit} from '@angular/core';
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
import {faPersonThroughWindow, faUserMinus} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-moodboard-detail',
  templateUrl: './moodboard-detail.component.html',
  styleUrls: ['./moodboard-detail.component.css'],
  providers: [AlertComponent],
})
export class MoodboardDetailComponent implements OnInit, AfterViewInit {
  faPersonThroughWindow = faPersonThroughWindow;
  faUserMinus = faUserMinus;

  userToAdd: string = "";

  currentUser!: Auth_Model;
  moodboard!: Moodboard;
  postingsInMoodboard$!: Observable<Posting[]>;
  coCreators!: any[];
  isLoggedIn = false;
  isOwner = false;
  isCoCreator = false;
  moodboardCreatorId!: number;
  dialogConfig = new MatDialogConfig();
  moodboard_Id!: number;

  constructor(private router: Router,
              private location: Location,
              private storageService: StorageService,
              private postingService: PostingService,
              private moodboardService: MoodboardService,
              public dialogPanel: MatDialog,
              private route: ActivatedRoute,
              private alert: AlertComponent) {

  }

  ngOnInit(): void {

    this.currentUser = this.storageService.getUser();
    this.isLoggedIn = this.storageService.isLoggedIn();

    this.route.params.subscribe((params: any) => {
      this.moodboardService.getOneMoodboard(params.id).subscribe(
        moodboard => {
          this.moodboard = moodboard
          this.moodboardCreatorId = this.moodboard.attributes.moodboard_creator.data.id;
          this.postingsInMoodboard$ = this.postingService.getPostingsInMoodboard(this.moodboard.id);

          this.moodboardService.getAllCoCreators(this.moodboard.id).subscribe(coCreator => {
            this.coCreators = coCreator

            if (coCreator.length > 0) {
              for (let i = 0; i < this.coCreators.length; i++) {
                if (this.coCreators[i].id == this.currentUser.user.id) {
                  this.isCoCreator = true;
                }
              }
            }
          })

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


  ngAfterViewInit(): void {

      setTimeout(() => {
        if (this.isCoCreator){
        let id = "co_" + this.currentUser.user.username;
        document.getElementById(id)!.classList.add("userHigh");
      }

      }, 100);

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
    this.moodboardService.removeImgFromMoodboard(imgId, this.moodboard.id, this.currentUser.jwt).subscribe(() => {
      this.postingsInMoodboard$ = this.postingService.getPostingsInMoodboard(this.moodboard.id)
      this.alert.openAlert("Posting removed from Moodboard")
    })
  }

  removeCoCreator(coCreator: number) {
    this.moodboardService.removeCoCreator(coCreator, this.moodboard.id, this.currentUser.jwt)
  }

  addCoCreator() {

    let userInArray: boolean = false;
    if (this.userToAdd.trim().length >= 3) {
      if (this.userToAdd != this.currentUser.user.username) {

        for (let i = 0; i < this.coCreators.length; i++) {
          if (this.coCreators[i].attributes.username == this.userToAdd) {
            userInArray = true
            this.alert.openAlert(this.userToAdd + " is already a co-creator")
          }
        }
        if (!userInArray) {
          this.moodboardService.addCoCreator(this.userToAdd, this.moodboard.id, this.currentUser.jwt).subscribe(res => {
            if (res == "User not found") {
              this.alert.openAlert("User not found")
            } else {
              this.alert.openAlert(this.userToAdd + " is now Co-Creator of " + this.moodboard.attributes.title)
            }
          })
        }

      } else {
        this.alert.openAlert("You can't add yourself")
      }

    } else {
      this.alert.openAlert("Username is to short")
    }
  }

  openDeleteDialog() {
    this.dialogConfig.data = {user: this.currentUser, moodboard: this.moodboard};
    this.dialogPanel.open(DeleteMoodboardDialogComponent, this.dialogConfig);
  }
}
