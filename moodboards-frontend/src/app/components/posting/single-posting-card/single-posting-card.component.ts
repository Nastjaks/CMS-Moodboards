import {Component, Input, OnInit} from '@angular/core';
import {Posting} from "../../../models/posting";
import {PostingDetailComponent} from "../posting-detail-dialog/posting-detail.component";
import {MatDialog} from "@angular/material/dialog";
import {Location} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-single-posting-card',
  templateUrl: './single-posting-card.component.html',
  styleUrls: ['./single-posting-card.component.css']
})
export class SinglePostingCardComponent {

  @Input() posting!: Posting;

  constructor(public dialogPanel: MatDialog, private location: Location, private router: Router) {
  }


  showPostDetails() {
    const url = this.router.url

    if (this.router.url == "/" || this.router.url == "/#discover") {
      this.location.go('/posting/' + this.posting.id);
    } else {
      this.location.go(url + '/posting/' + this.posting.id);
    }

    this.dialogPanel.open(PostingDetailComponent, {
      data: {
        posting: this.posting
      }
    }).afterClosed().subscribe(() => {
        if (this.router.url == "/#discover") {
          this.location.go('/')
        } else {
          this.location.go(url)
        }
      }
    );
  }

}
