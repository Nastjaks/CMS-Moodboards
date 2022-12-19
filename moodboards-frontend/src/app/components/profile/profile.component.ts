import {Component, Input, OnInit} from '@angular/core';
import {StorageService} from "../../services/storage.service";
import {Auth_Model} from "../../models/auth_Model";
import {UserService} from "../../services/user.service";
import {Observable} from "rxjs";
import {Posting} from "../../models/posting";
import {Moodboard} from "../../models/moodboard";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {PostingDetailComponent} from "../posting-detail/posting-detail.component";
import {MatDialog} from "@angular/material/dialog";
import {CreatePostingComponent} from "../create-posting/create-posting.component";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentUser!: Auth_Model;

  posting$!: Observable<Posting[]>;
  moodboard$!: Observable<Moodboard[]>;

  isUserEditable: boolean = false;
  usernameFieldValue!: string;
  emailFieldValue!: string;
  descriptionFieldValue!: string;
  errorMessage = '';


  constructor(private fb: FormBuilder,
              private storageService: StorageService,
              private userService: UserService,
              public authService: AuthService,
              public dialogPanal: MatDialog) {
  }

  ngOnInit(): void {
    this.currentUser = this.storageService.getUser();
    this.posting$ = this.userService.getAllUserPostings(this.currentUser.user.id);
    this.moodboard$ = this.userService.getAllUserMoodbards(this.currentUser.user.id);
  }

  editUserData() {
    this.isUserEditable = true;
    this.usernameFieldValue = this.currentUser.user.username;
    this.emailFieldValue = this.currentUser.user.email;
    this.descriptionFieldValue = this.currentUser.user.description;
  }

  save() {
    let username = (<HTMLInputElement>document.getElementById("username")).value;
    let email = (<HTMLInputElement>document.getElementById("email")).value;
    let description = (<HTMLInputElement>document.getElementById("description")).value;
    this.currentUser.user.username = username;
    this.currentUser.user.email = email;
    this.currentUser.user.description = description;

    const id = this.currentUser.user.id;
    const jwt = this.currentUser.jwt;

    if (username && email) {
      this.userService.editUserInformation(username, email, description, id, jwt)
        .subscribe({
          next: data => {
            this.isUserEditable = false;
          },
          error: err => {
            this.errorMessage = err.error.message;
          }
        });
    }
  }

  deleteUserData() {
    const id = this.currentUser.user.id;
    const jwt = this.currentUser.jwt;

    this.userService.deleteUserInformation(id, jwt)
      .subscribe({
        next: data => {
          this.authService.logout();
        },
        error: err => {
          this.errorMessage = err.error.message;
        }
      });
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

  createPotingDialog() {
    this.dialogPanal.open(CreatePostingComponent).
    afterClosed().subscribe(
      result => {
        //this.location.go('/');
      }
    );
  }
}
