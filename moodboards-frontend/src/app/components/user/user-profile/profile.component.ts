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
import {Router} from "@angular/router";
import {MoodboardCreateDialogComponent} from "../../moodboards/moodboard-create-dialog/moodboard-create-dialog.component";

@Component({
  selector: 'app-user-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentUser!: Auth_Model;
  postings$!: Observable<Posting[]>;
  moodboards$!: Observable<Moodboard[]>;

  userCurrentlyEdit: boolean = false;

  //usernameFieldValue!: string;
  //emailFieldValue!: string;
  //descriptionFieldValue!: string;

  constructor(private fb: FormBuilder,
              private storageService: StorageService,
              private userService: UserService,
              public dialogPanel: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.currentUser = this.storageService.getUser();
    this.postings$ = this.userService.getAllUserPostings(this.currentUser.user.id);
    this.moodboards$ = this.userService.getAllUserMoodboards(this.currentUser.user.id);
  }

  editUserData() {
    this.userCurrentlyEdit = true;

    //this.currentUsername = this.currentUser.user.username;
    //this.currentMail = this.currentUser.user.email;
    //this.currentDescription = this.currentUser.user.description;
  }

  saveChanges() {
    //let username = (<HTMLInputElement>document.getElementById("username")).value;
    //let email = (<HTMLInputElement>document.getElementById("email")).value;
    //let description = (<HTMLInputElement>document.getElementById("description")).value;
   //this.currentUser.user.username = username;
   //this.currentUser.user.email = email;
    //this.currentUser.user.description = description;

    //const id = this.currentUser.user.id;
    //const jwt = this.currentUser.jwt;

    if (this.currentUser.user.username && this.currentUser.user.email) {
      this.userService.editUserInformation(this.currentUser.user.username, this.currentUser.user.email, this.currentUser.user.description, this.currentUser.user.id, this.currentUser.jwt)
        .subscribe({
          next: data => {
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
    this.dialogPanel.open(DeleteDialogComponent,{
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
    document.getElementById('postingsContainer')!.style.setProperty("display", "block");
    document.getElementById('moodboardContainer')!.style.setProperty("display", "none");
    document.getElementById('postingNav')!.style.setProperty("border-bottom", "7px solid #2b1055");
    document.getElementById('moodboardNav')!.style.setProperty("border-bottom", "none");
  }

  showMoodboards() {
    document.getElementById('postingsContainer')!.style.setProperty("display", "none");
    document.getElementById('moodboardContainer')!.style.setProperty("display", "block");
    document.getElementById('postingNav')!.style.setProperty("border-bottom", "none");
    document.getElementById('moodboardNav')!.style.setProperty("border-bottom", "7px solid #2b1055");
  }
}
