import {Component, Inject, Optional} from '@angular/core';
import {Auth_Model} from "../../../models/auth_Model";
import {UserService} from "../../../services/user.service";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {Posting} from "../../../models/posting";
import {PostingService} from "../../../services/posting.service";
import {Router} from "@angular/router";
import {PostingDetailComponent} from "../posting-detail-dialog/posting-detail.component";

@Component({
  selector: 'app-posting-delete-dialog',
  templateUrl: './delete-posting-dialog.component.html',
  styleUrls: ['./delete-posting-dialog.component.css']
})
export class DeletePostingDialogComponent {

  currentUser!: Auth_Model;
  posting!: Posting;

  constructor(private userService: UserService, private postingService: PostingService,
              @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
              private router: Router,
              private dialogPanel: MatDialog) {
    this.currentUser = this.data.user;
    this.posting = this.data.posting;
  }

  deletePosting() {
    this.postingService.deleteImage(this.posting.attributes.image.data.id, this.currentUser.jwt).subscribe( () => {
      this.postingService.deletePosting(this.posting.id, this.currentUser.jwt).subscribe(() => {
        this.router.navigate(["/profile"]).then(() => window.location.reload())
      });
    });
  }

  close() {
    this.dialogPanel.open(PostingDetailComponent, {
      data: {
        posting_Id: this.posting.id
      }
    });
  }

}
