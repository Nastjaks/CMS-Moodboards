import {Component, Inject, OnInit, Optional} from '@angular/core';
import {Auth_Model} from "../../models/auth_Model";
import {UserService} from "../../services/user.service";
import {AuthService} from "../../services/auth.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Moodboard} from "../../models/moodboard";
import {Posting} from "../../models/posting";
import {Observable} from "rxjs";
import {PostingService} from "../../services/posting.service";

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent implements OnInit {

  currentUser!: Auth_Model;
  postings$!: Observable<Posting[]>;
  moodboards$!: Observable<Moodboard[]>;

  constructor(private userService: UserService,
              @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
              private authService: AuthService,
              private postingService: PostingService) {
    this.currentUser = this.data.user;
  }

  ngOnInit(): void {
    this.postings$ = this.userService.getAllUserPostings(this.currentUser.user.id);
    this.moodboards$ = this.userService.getAllUserMoodboards(this.currentUser.user.id);

    console.log(this.moodboards$.subscribe(res => res.length))
  }

  deleteUserData() {
    const id = this.currentUser.user.id;
    const jwt = this.currentUser.jwt;

    this.moodboards$.forEach((moodboard) => {
      for (const moodboardDetail in moodboard) {
        let moodboardID = moodboard[moodboardDetail].id
        this.userService.deleteUserMoodboards(moodboardID, jwt).subscribe(res => console.log(res));
      }
    }).then(r =>
      this.postings$.forEach((posting) => {
        for (const postingDetail in posting) {
          let postingID = posting[postingDetail].id;
          let postingIDImage = posting[postingDetail].attributes.image.data.id;
          this.postingService.deleteImage(postingIDImage, jwt).subscribe( res => {
            this.userService.deleteUserPostings(postingID, jwt).subscribe(res => console.log(res));
          })
        }
      }).then(r =>
        this.userService.deleteUserInformation(id, jwt).subscribe(res => console.log(res))
      )
    );
    this.authService.logout();
  }
}
