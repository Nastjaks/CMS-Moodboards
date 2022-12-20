import {Component, Inject, OnInit, Optional} from '@angular/core';
import {Auth_Model} from "../../models/auth_Model";
import {UserService} from "../../services/user.service";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {Posting} from "../../models/posting";
import {PostingService} from "../../services/posting.service";
import {Router} from "@angular/router";
import {PostingDetailComponent} from "../posting-detail/posting-detail.component";

@Component({
  selector: 'app-delete-posting-dialog',
  templateUrl: './delete-posting-dialog.component.html',
  styleUrls: ['./delete-posting-dialog.component.css']
})
export class DeletePostingDialogComponent implements OnInit {

  currentUser!: Auth_Model;
  posting!: Posting;

  constructor(private userService: UserService, private postingService: PostingService,
              @Optional() @Inject(MAT_DIALOG_DATA) public data: any, private router: Router,
              private dialogPanel: MatDialog) {
    this.currentUser = this.data.user;
    this.posting = this.data.posting;
  }

  ngOnInit(): void {

  }

  deletePosting() {
    this.postingService.deletePosting(this.posting.id, this.currentUser.jwt).subscribe(res => {
      this.router.navigate(["/profile"]).then(r => window.location.reload());
    });
  }

  close() {
    this.dialogPanel.open(PostingDetailComponent, {
      width: 'auto',
      height: 'auto',
      data: {
        posting: this.posting
      }

    }).afterClosed().subscribe(
      result => {
        //this.location.go('/');
      }
    );
  }
}
