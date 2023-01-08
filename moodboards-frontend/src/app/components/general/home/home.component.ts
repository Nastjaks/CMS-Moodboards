import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Posting} from "../../../models/posting";
import {PostingService} from "../../../services/posting.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  implements OnInit {
  posting$!: Observable<Posting[]>;
  constructor(private postingService: PostingService) {}

  ngOnInit(): void {
    this.posting$ = this.postingService.getAllPostings();
  }

}
