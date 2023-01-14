import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Posting} from "../../../models/posting";
import {PostingService} from "../../../services/posting.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PostingDetailComponent} from "../posting-detail-dialog/posting-detail.component";
import {Location} from "@angular/common";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-postings-overview',
  templateUrl: './postings-overview.component.html',
  styleUrls: ['./postings-overview.component.css']
})
export class PostingsOverviewComponent implements OnInit {

  posting$!: Observable<Posting[]>;

  constructor(private postingService: PostingService,
              private route: ActivatedRoute,
              private location: Location,
              public dialogPanel: MatDialog) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      if (params.poId != null) {
        this.showPostDetails(params.poId);
      }
      if (params.category != null) {
        this.posting$ = this.postingService.getAllPostingsByCategory(params.category);
      } else if (params.category == null) {
        this.posting$ = this.postingService.getAllPostings();
      }
    })
  }

  showPostDetails(poId: number) {

    this.route.params.subscribe((params: any) => {
      if (params.category != null) {
        this.location.go('postings/' + params.category + '/posting/' + poId)
      } else {
        this.location.go('postings/posting/' + poId)
      }

      this.dialogPanel.open(PostingDetailComponent, {
        data: {
          postingID: poId
        }
      }).afterClosed().subscribe(() => {
        if (params.category != null) {
          this.location.go('postings/' + params.category)
        } else {
          this.location.go('postings/')
        }
      });
    })
  }


}
