import {Component, Inject, OnInit, Optional} from '@angular/core';
import {Auth_Model} from "../../../models/auth_Model";
import {UserService} from "../../../services/user.service";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {StorageService} from "../../../services/storage.service";
import {User} from "../../../models/user";
import {DeleteDialogComponent} from "../user-delete-dialog/delete-dialog.component";

@Component({
  selector: 'app-user-edit-dialog',
  templateUrl: './user-edit-dialog.component.html',
  styleUrls: ['./user-edit-dialog.component.css']
})
export class UserEditDialogComponent implements OnInit {
  currentUser!: Auth_Model;

  currentUsername!: string;
  currentMail!: string;
  currentDescription!: string;
  user!: User;

  constructor(private userService: UserService,
              private storageService: StorageService,
              public dialogPanel: MatDialog,
              @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
    this.currentUser = this.data.user;
  }

  ngOnInit(): void {
    this.userService.getUserInformation(this.currentUser.user.id).subscribe(
      user => {
        this.user = user;
        this.currentUsername = this.user.username;
        this.currentMail = this.user.email;
        this.currentDescription = this.user.description;
      }
    );
  }

  saveChanges() {
    if (this.currentUsername && this.currentMail) {
      this.userService.editUserInformation(this.currentUsername, this.currentMail, this.currentDescription, this.currentUser.user.id, this.currentUser.jwt)
        .subscribe({
          next: () => {
            this.storageService.saveUser(this.currentUser);
            window.location.reload();
          },
          error: err => {
            console.log(err.error.message);
          }
        });
    }
  }

  openDeleteUserDialog() {
    this.dialogPanel.open(DeleteDialogComponent, {
      data: {
        user: this.currentUser,
      }
    })
  }
}
