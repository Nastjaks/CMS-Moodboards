import {Component, Inject, OnInit, Optional} from '@angular/core';
import {Auth_Model} from "../../../models/auth_Model";
import {UserService} from "../../../services/user.service";
import {AuthService} from "../../../services/auth.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Moodboard} from "../../../models/moodboard";
import {Posting} from "../../../models/posting";
import {Observable} from "rxjs";
import {PostingService} from "../../../services/posting.service";

@Component({
  selector: 'app-user-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent implements OnInit {

  currentUser!: Auth_Model;
  //postings$!: Observable<Posting[]>;
  //moodboards$!: Observable<Moodboard[]>;
  moodboards!: Moodboard[];
  postings!: Posting[];

  constructor(private userService: UserService,
              @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
              private authService: AuthService,
              private postingService: PostingService
  ) {
    this.currentUser = this.data.user;
  }

  ngOnInit(): void {
    this.userService.getAllUserPostings(this.currentUser.user.id).subscribe(
      postings => {
        this.postings = postings
      }
    );

    this.userService.getAllUserMoodboards(this.currentUser.user.id).subscribe(
      moodboars => {
        this.moodboards = moodboars
      }
    );
  }

  deleteUserData() {

    let deletedMood = 0;
    //wenn der Nutzer Moodboards hat
    if (this.moodboards.length > 0) {
      for (let i = 0; i < this.moodboards.length; i++) {

        this.userService.deleteUserMoodboards(this.moodboards[i].id, this.currentUser.jwt).subscribe(() => {
          deletedMood++

          if (deletedMood == this.moodboards.length) {
            this.deletAllUserPostings();
          }
        });
      }
    } else if (this.moodboards.length == 0) {   //wenn der Nutzer keine Moodboards hat
      this.deletAllUserPostings();
    }


    /*
    this.moodboards$.forEach((moodboard) => {
      for (const mInfo in moodboard) {
        this.userService.deleteUserMoodboards(moodboard[mInfo].id, this.currentUser.jwt).subscribe(res => console.log(res));
      }
    }).then(() =>
      this.postings$.forEach((posting) => {
        for (const pInfo in posting) {
          this.postingService.deleteImage(posting[pInfo].attributes.image.data.id, this.currentUser.jwt).subscribe(() => {
            this.postingService.deletePosting(posting[pInfo].id, this.currentUser.jwt).subscribe(res => console.log(res));
          })
        }
      }).then(() => {
          console.log("done")
          //this.userService.deleteUserInformation(this.currentUser.user.id, this.currentUser.jwt).subscribe(() =>
          //this.authService.logout()
          //)
        }
      )
    );*/

  }

  deletAllUserPostings() {
  //wenn der Nutzer Posings hat
    if (this.postings.length > 0) {
      for (let i = 0; i < this.postings.length; i++) {

        let deletedPost = 0;
        this.postingService.deleteImage(this.postings[i].attributes.image.data.id, this.currentUser.jwt).subscribe(() => {
          console.log("image");
          this.postingService.deletePosting(this.postings[i].id, this.currentUser.jwt).subscribe(() => {
            console.log("posting");
            deletedPost++

            if (deletedPost == this.postings.length) {
              this.userService.deleteUserInformation(this.currentUser.user.id, this.currentUser.jwt).subscribe(() =>
                this.authService.logout()
              )
            }
          });
        });
      }
    } else if (this.postings.length == 0) { //wenn der Nutzer keine Posings hat
      this.userService.deleteUserInformation(this.currentUser.user.id, this.currentUser.jwt).subscribe(() =>
        this.authService.logout()
      )
    }
  }
}

