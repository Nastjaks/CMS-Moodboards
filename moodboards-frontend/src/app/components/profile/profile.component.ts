import {Component, OnInit} from '@angular/core';
import {StorageService} from "../../services/storage.service";
import {Auth_Model} from "../../models/auth_Model";
import {UserService} from "../../services/user.service";
import {Observable} from "rxjs";
import {Posting} from "../../models/posting";
import {Moodboard} from "../../models/moodboard";
import {FormBuilder} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {CreatePostingComponent} from "../create-posting/create-posting.component";
import {DeleteDialogComponent} from "../delete-dialog/delete-dialog.component";
import {Router} from "@angular/router";
import {User} from "../../models/user";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentUser!: Auth_Model;

  postings$!: Observable<Posting[]>;
  moodboards$!: Observable<Moodboard[]>;

  isUserEditable: boolean = false;
  usernameFieldValue!: string;
  emailFieldValue!: string;
  descriptionFieldValue!: string;
  errorMessage = '';
  currentUser2!: User;

  constructor(private fb: FormBuilder,
              private storageService: StorageService,
              private userService: UserService,
              public dialogPanel: MatDialog, private router: Router) {
    this.currentUser = this.storageService.getUser();
  }

  ngOnInit(): void {
    this.currentUser = this.storageService.getUser();
    this.postings$ = this.userService.getAllUserPostings(this.currentUser.user.id);
    this.moodboards$ = this.userService.getAllUserMoodboards(this.currentUser.user.id);
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
    let result: User;

    if (username && email) {
      this.userService.editUserInformation(username, email, description, id, jwt)
        .subscribe({
          next: data => {
            this.isUserEditable = false;
            this.storageService.saveUser(this.currentUser);

            //this.router.navigate(["/profile"]).then(r => window.location.reload());

          },
          error: err => {
            this.errorMessage = err.error.message;
          }
        });
    }
  }


  checkDelete() {
    this.dialogPanel.open(DeleteDialogComponent, {
      width: '500px',
      height: '200px',
      data: {
        user: this.currentUser,
      }

    }).afterClosed().subscribe(
      result => {
        //this.location.go('/');
      }
    );
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

  createPostingDialog() {
    this.dialogPanel.open(CreatePostingComponent, {
      data: {
        user: this.currentUser,
      }
    }).afterClosed().subscribe(
      result => {
        //this.location.go('/');
      }
    );
  }

  createMoodboardDialog() {
  }
}
