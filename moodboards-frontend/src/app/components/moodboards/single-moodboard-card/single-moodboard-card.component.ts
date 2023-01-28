import {Component, Input, OnInit,} from '@angular/core';
import {Moodboard} from "../../../models/moodboard";
import {Location} from "@angular/common";
import {Router} from "@angular/router";
import {Auth_Model} from "../../../models/auth_Model";
import {StorageService} from "../../../services/storage.service";
import {MoodboardService} from "../../../services/moodboard.service";

@Component({
  selector: 'app-single-moodboard-card',
  templateUrl: './single-moodboard-card.component.html',
  styleUrls: ['./single-moodboard-card.component.css']
})
export class SingleMoodboardCardComponent implements OnInit{
  @Input() moodboard!: Moodboard;

  currentUser!: Auth_Model;
  isLoggedIn = false;
  isOwner = false;

  coCreators!: any[];
  hasCoCreator = false;
  isCoCreator = false;

  isPrivate = false;

  constructor(private location: Location, private router: Router, private storageService: StorageService, private moodboardService: MoodboardService,) {
  }

  ngOnInit(): void {
    this.currentUser = this.storageService.getUser();
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      if (this.moodboard.attributes.moodboard_creator.data.id == this.currentUser.user.id) {
        this.isOwner = true;
      }
    }
    this.getCocreator();

    if (this.moodboard.attributes.private){
          this.isPrivate = true;
    }
  }

  getCocreator(){
    this.moodboardService.getAllCoCreators(this.moodboard.id).subscribe(coCreator => {
      this.coCreators = coCreator

      if (coCreator.length > 0) {
        this.hasCoCreator = true;
        for (let i = 0; i < this.coCreators.length; i++) {
          if (this.coCreators[i].id == this.currentUser.user.id){
            this.isCoCreator = true;
          }
        }

      }
    })
  }

  showMoodboardDetails() {
    this.router.navigateByUrl('/moodboard/' + this.moodboard.id, { state: {moodboard: this.moodboard } });
  }



}
