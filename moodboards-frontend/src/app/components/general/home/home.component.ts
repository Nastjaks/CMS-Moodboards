import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Posting} from "../../../models/posting";
import {PostingService} from "../../../services/posting.service";
import {ActivatedRoute} from "@angular/router";
import {PostingDetailComponent} from "../../posting/posting-detail-dialog/posting-detail.component";
import {Location} from "@angular/common";
import {MatDialog} from "@angular/material/dialog";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  posting$!: Observable<Posting[]>;

  constructor(private postingService: PostingService,
              private route: ActivatedRoute,
              private location: Location,
              public dialogPanel: MatDialog) {
  }

  ngOnInit(): void {
    this.posting$ = this.postingService.getAllPostings();

    this.route.params.subscribe((params: any) => {
      if (params.poId != null) {
        this.showPostDetails(params.poId);
      }
    })
  }

  showPostDetails(poId: number) {
    this.location.go('/posting/' + poId)

    this.dialogPanel.open(PostingDetailComponent, {
      data: {
        postingID: poId
      }
    }).afterClosed().subscribe(() => {
      this.location.go("/")
    });
  }

}
