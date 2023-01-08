import {Component, OnInit} from '@angular/core';
import {StorageService} from "../../../services/storage.service";
import {Auth_Model} from "../../../models/auth_Model";
import {UserService} from "../../../services/user.service";
import {Observable} from "rxjs";
import {Posting} from "../../../models/posting";
import {Moodboard} from "../../../models/moodboard";
import {FormBuilder} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {CreatePostingComponent} from "../../posting/posting-create-dialog/create-posting.component";
import {DeleteDialogComponent} from "../user-delete-dialog/delete-dialog.component";
import {
  MoodboardCreateDialogComponent
} from "../../moodboards/moodboard-create-dialog/moodboard-create-dialog.component";
import {AuthService} from "../../../services/auth.service";
import {User} from "../../../models/user";

@Component({
  selector: 'app-user-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentUser!: Auth_Model;
  postings$!: Observable<Posting[]>;
  moodboards$!: Observable<Moodboard[]>;
  user!: User;

  userCurrentlyEdit: boolean = false;

  currentUsername!: string;
  currentMail!: string;
  currentDescription!: string;

  constructor(private fb: FormBuilder,
              private storageService: StorageService,
              private userService: UserService,
              public dialogPanel: MatDialog,
              public authService: AuthService) {

  }

  ngOnInit(): void {
    this.currentUser = this.storageService.getUser();
    this.userService.getUserInformation(this.currentUser.user.id).subscribe(user => this.user = user);

    this.postings$ = this.userService.getAllUserPostings(this.currentUser.user.id);
    this.moodboards$ = this.userService.getAllUserMoodboards(this.currentUser.user.id);
  }

  editUserData() {
    this.userCurrentlyEdit = true;
    this.currentUsername = this.user.username
    this.currentMail = this.user.email
    this.currentDescription = this.user.description
  }

  saveChanges() {
    if (this.currentUsername && this.currentMail) {
      this.userService.editUserInformation(this.currentUsername, this.currentMail, this.currentDescription, this.currentUser.user.id, this.currentUser.jwt)
        .subscribe({
          next: () => {
            this.userCurrentlyEdit = false;
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

  openCreatePostingDialog() {
    this.dialogPanel.open(CreatePostingComponent, {
      data: {
        user: this.currentUser,
      }
    })
  }

  openCreateMoodboardDialog() {
    this.dialogPanel.open(MoodboardCreateDialogComponent, {
      data: {
        user: this.currentUser,
      }
    })
  }

  showPostings() {
    document.getElementById('moodboardContainer')!.classList.add("hiddeContainer");
    document.getElementById('postingsContainer')!.classList.remove("hiddeContainer");
    document.getElementById('postingNav')!.classList.add("active");
    document.getElementById('moodboardNav')!.classList.remove("active");
  }

  showMoodboards() {
    document.getElementById('moodboardContainer')!.classList.remove("hiddeContainer");
    document.getElementById('postingsContainer')!.classList.add("hiddeContainer");
    document.getElementById('moodboardNav')!.classList.add("active");
    document.getElementById('postingNav')!.classList.remove("active");
  }

  logOut() {
    this.authService.logout();
  }
}
