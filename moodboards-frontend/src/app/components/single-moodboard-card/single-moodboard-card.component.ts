import {Component, Input,} from '@angular/core';
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
    console.log(this.moodboard);
    this.router.navigateByUrl('/moodboard/' + this.moodboard.id, { state: {moodboard: this.moodboard } });
    //this.location.go('/moodboard/' + this.moodboard.id);
  }

}
