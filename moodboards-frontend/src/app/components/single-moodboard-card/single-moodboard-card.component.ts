import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Moodboard} from "../../models/moodboard";
import {Location} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-single-moodboard-card',
  templateUrl: './single-moodboard-card.component.html',
  styleUrls: ['./single-moodboard-card.component.css']
})
export class SingleMoodboardCardComponent {
  @Input() moodboard!: Moodboard;

  constructor(private location: Location, private router: Router) {  }

  showMoodboardDetails() {
    this.router.navigateByUrl('/moodboard/' + this.moodboard.id, { state: {moodboard: this.moodboard } }); //leitet zur seite "/moodboard" weiter und gibt das moodboard mit
    console.log(this.moodboard);
    //this.location.go('/moodboard/' + this.moodboard.id);
  }

}
