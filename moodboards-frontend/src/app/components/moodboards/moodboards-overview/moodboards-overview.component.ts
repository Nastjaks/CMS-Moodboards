import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Moodboard} from "../../../models/moodboard";
import {MoodboardService} from "../../../services/moodboard.service";

@Component({
  selector: 'app-moodboards-overview',
  templateUrl: './moodboards-overview.component.html',
  styleUrls: ['./moodboards-overview.component.css']
})
export class MoodboardsOverviewComponent implements OnInit {

  moodboards!: Moodboard[];

  constructor(private moodboardService: MoodboardService) {  }

  ngOnInit(): void {
    this.moodboardService.getAllMoodboards().subscribe((res)=>{
      this.moodboards = res;
    });
  }

}
