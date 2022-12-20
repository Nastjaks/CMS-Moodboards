import {Component, forwardRef, Inject, OnInit, Optional} from '@angular/core';
import {Auth_Model} from "../../models/auth_Model";
import {UserService} from "../../services/user.service";
import {AuthService} from "../../services/auth.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Moodboard} from "../../models/moodboard";
import {Posting} from "../../models/posting";
import {Observable} from "rxjs";

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent implements OnInit {

  currentUser!: Auth_Model;
  postings$!: Observable<Posting[]>;
  moodboards$!: Observable<Moodboard[]>;

  constructor(private userService: UserService, public authService: AuthService, @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
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
      console.log(moodboard);

      //this.userService.deleteUserMoodboards(moodboard.id, jwt).subscribe(res => console.log(res));
    });
    /*
        this.postings.forEach((posting) => {
          this.userService.deleteUserPostings(posting.id, jwt).subscribe(res => console.log(res));
        });*/

    // this.userService.deleteUserInformation(id, jwt).subscribe(res => console.log(res));

  }

}
