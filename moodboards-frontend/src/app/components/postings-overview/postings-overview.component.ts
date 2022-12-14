import { Component } from '@angular/core';
import {Observable} from "rxjs";
import {Posting} from "../../models/posting";
import {PostingService} from "../../services/posting.service";

@Component({
  selector: 'app-postings-overview',
  templateUrl: './postings-overview.component.html',
  styleUrls: ['./postings-overview.component.css']
})
export class PostingsOverviewComponent {

  posting$: Observable<Posting[]>;

  constructor(private postingService: PostingService) {
    this.posting$ = this.postingService.getAllPostings();
  }

}
