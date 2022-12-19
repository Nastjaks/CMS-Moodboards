import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Posting} from "../../models/posting";
import {PostingService} from "../../services/posting.service";

@Component({
  selector: 'app-postings-overview',
  templateUrl: './postings-overview.component.html',
  styleUrls: ['./postings-overview.component.css']
})
export class PostingsOverviewComponent implements OnInit {

  posting$!: Observable<Posting[]>;

  constructor(private postingService: PostingService) {}

  ngOnInit(): void {
    this.posting$ = this.postingService.getAllPostings();
  }



}
