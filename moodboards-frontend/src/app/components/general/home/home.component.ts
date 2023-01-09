import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Posting} from "../../../models/posting";
import {PostingService} from "../../../services/posting.service";
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  posting$!: Observable<Posting[]>;

  constructor(private postingService: PostingService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.posting$ = this.postingService.getAllPostings();

    this.route.params.subscribe((params: any) => {
      if (params.poId != null) {
        console.log(params.poId)
      }
    })
  }

}
