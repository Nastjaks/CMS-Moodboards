import {AfterViewInit, Component, OnInit} from '@angular/core';
import {StorageService} from "../../../services/storage.service";
import {Auth_Model} from "../../../models/auth_Model";
import {UserService} from "../../../services/user.service";
import {Posting} from "../../../models/posting";
import {Moodboard} from "../../../models/moodboard";
import {FormBuilder} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {CreatePostingComponent} from "../../posting/posting-create-dialog/create-posting.component";
import {MoodboardCreateDialogComponent} from "../../moodboards/moodboard-create-dialog/moodboard-create-dialog.component";
import {AuthService} from "../../../services/auth.service";
import {User} from "../../../models/user";
import {ActivatedRoute, Router} from "@angular/router";
import {UserEditDialogComponent} from "../user-edit-dialog/user-edit-dialog.component";
import {PostingDetailComponent} from "../../posting/posting-detail-dialog/posting-detail.component";
import {Location} from "@angular/common";

@Component({
  selector: 'app-user-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, AfterViewInit {

  isLoggedIn = false;
  currentUser!: Auth_Model;
  postings!: Posting[];
  moodboards!: Moodboard[];
  coMoodboards!: Moodboard[];
  user!: User;

  constructor(private fb: FormBuilder,
              private storageService: StorageService,
              private userService: UserService,
              private location: Location,
              public dialogPanel: MatDialog,
              public authService: AuthService,
              private route: ActivatedRoute,
              private router: Router) {

  }

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.route.params.subscribe((params: any) => {
        if (params.poId != null) {
          this.showPostDetails(params.poId);
        }
      })

      this.currentUser = this.storageService.getUser();
      this.userService.getUserInformation(this.currentUser.user.id).subscribe(user => this.user = user);
      this.userService.getAllCoMoodboards(this.currentUser.user.id).subscribe(moodboards => this.coMoodboards = moodboards);

    } else {
      this.router.navigate(['/login']).then(() =>  {} );
    }

  }

  ngAfterViewInit(): void {
    this.showPostings()
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
    }).afterClosed().subscribe(() => {
      this.userService.getAllUserPostings(this.currentUser.user.id).subscribe(postings => this.postings = postings);
    })
  }

  openCreateMoodboardDialog() {
    this.dialogPanel.open(MoodboardCreateDialogComponent, {
      data: {
        user: this.currentUser,
      }
    }).afterClosed().subscribe(()=>{
      this.userService.getAllUserMoodboards(this.currentUser.user.id).subscribe(moodboards => this.moodboards = moodboards);
    })
  }

  showPostings() {
    this.userService.getAllUserPostings(this.currentUser.user.id).subscribe(postings => this.postings = postings);
    document.getElementById('moodboardContainer')!.classList.add("hideContainer");
    document.getElementById('moodboardNav')!.classList.remove("active");

    document.getElementById('coCreatorContainer')!.classList.add("hideContainer");
    document.getElementById('coCreatorNav')!.classList.remove("active");

    document.getElementById('postingNav')!.classList.add("active");
    document.getElementById('postingsContainer')!.classList.remove("hideContainer");

  }

  showMoodboards() {
    this.userService.getAllUserMoodboards(this.currentUser.user.id).subscribe(moodboards => this.moodboards = moodboards);
    document.getElementById('postingsContainer')!.classList.add("hideContainer");
    document.getElementById('postingNav')!.classList.remove("active");

    document.getElementById('coCreatorContainer')!.classList.add("hideContainer");
    document.getElementById('coCreatorNav')!.classList.remove("active");

    document.getElementById('moodboardNav')!.classList.add("active");
    document.getElementById('moodboardContainer')!.classList.remove("hideContainer");
  }

  showCoCreatorNav() {
    this.userService.getAllCoMoodboards(this.currentUser.user.id).subscribe(moodboards => this.coMoodboards = moodboards);
    document.getElementById('moodboardContainer')!.classList.add("hideContainer");
    document.getElementById('moodboardNav')!.classList.remove("active");

    document.getElementById('postingsContainer')!.classList.add("hideContainer");
    document.getElementById('postingNav')!.classList.remove("active");

    document.getElementById('coCreatorNav')!.classList.add("active");
    document.getElementById('coCreatorContainer')!.classList.remove("hideContainer");
  }

  logout() {
    this.authService.logout();
  }


}
