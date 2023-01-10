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
import {MoodboardCreateDialogComponent} from "../../moodboards/moodboard-create-dialog/moodboard-create-dialog.component";
import {AuthService} from "../../../services/auth.service";
import {User} from "../../../models/user";
import {ActivatedRoute} from "@angular/router";
import {UserEditDialogComponent} from "../user-edit-dialog/user-edit-dialog.component";
import {PostingDetailComponent} from "../../posting/posting-detail-dialog/posting-detail.component";
import {Location} from "@angular/common";

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

  constructor(private fb: FormBuilder,
              private storageService: StorageService,
              private userService: UserService,
              private location: Location,
              public dialogPanel: MatDialog,
              public authService: AuthService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      if (params.poId != null) {
        this.showPostDetails(params.poId);
      }
    })
    this.currentUser = this.storageService.getUser();
    this.userService.getUserInformation(this.currentUser.user.id).subscribe(user => this.user = user);

    this.postings$ = this.userService.getAllUserPostings(this.currentUser.user.id);
    this.moodboards$ = this.userService.getAllUserMoodboards(this.currentUser.user.id);
  }

  showPostDetails(poId: number) {
    this.location.go('/profile/posting/' + poId)

    this.dialogPanel.open(PostingDetailComponent, {
      data: {
        postingID: poId
      }
    }).afterClosed().subscribe(() => {
      this.location.go("/profile")
    });
  }

  editUserData() {
    this.dialogPanel.open(UserEditDialogComponent, {
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

  logout() {
    this.authService.logout();
  }
}
