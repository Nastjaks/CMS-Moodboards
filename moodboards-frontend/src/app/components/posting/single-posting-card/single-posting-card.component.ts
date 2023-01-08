import {Component, Input} from '@angular/core';
import {Posting} from "../../../models/posting";
import {PostingDetailComponent} from "../posting-detail-dialog/posting-detail.component";
import {MatDialog} from "@angular/material/dialog";
import {Location} from "@angular/common";
import {Router} from "@angular/router";


@Component({
  selector: 'app-single-posting-card',
  templateUrl: './single-posting-card.component.html',
  styleUrls: ['./single-posting-card.component.css']
})
export class SinglePostingCardComponent {

  @Input() posting!: Posting;

  constructor(public dialogPanel: MatDialog, private location: Location, private router : Router) {  }

  showPostDetails() {
     const url = this.router.url

    if(this.router.url == "/"){
      this.location.go( '/posting/' + this.posting.id);
    }

    if(this.router.url == "/postings"){
      this.location.go( url + '/posting/' + this.posting.id);
    }

    this.dialogPanel.open(PostingDetailComponent, {
      data: {
        posting: this.posting
      }
    }).afterClosed().subscribe( () =>
     this.location.go(url)


    );
  }
}
