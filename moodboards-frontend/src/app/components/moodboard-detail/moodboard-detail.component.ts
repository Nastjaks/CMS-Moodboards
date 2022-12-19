import {Component, OnInit} from '@angular/core';
import {Moodboard} from "../../models/moodboard";
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import {Observable} from "rxjs";
import {Posting} from "../../models/posting";
import {PostingService} from "../../services/posting.service";

@Component({
  selector: 'app-moodboard-detail',
  templateUrl: './moodboard-detail.component.html',
  styleUrls: ['./moodboard-detail.component.css']
})
export class MoodboardDetailComponent implements OnInit {

  moodboard$!: Moodboard;
  postingsInMoodboard$!: Observable<Posting[]>;

  constructor(private router: Router, private location: Location, private postingService: PostingService ) {
  }

  ngOnInit(): void {
    this.moodboard$ = history.state.moodboard;
    this.postingsInMoodboard$ = this.postingService.getAllPostingsInMoodboard(this.moodboard$.id);
  }

}
