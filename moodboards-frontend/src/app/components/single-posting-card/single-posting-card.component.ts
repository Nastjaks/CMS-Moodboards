import {Component, Input} from '@angular/core';
import {Posting} from "../../models/posting";
import {Location} from "@angular/common";
import {PostingDetailComponent} from "../posting-detail/posting-detail.component";
import {MatDialog} from "@angular/material/dialog";


@Component({
  selector: 'app-single-posting-card',
  templateUrl: './single-posting-card.component.html',
  styleUrls: ['./single-posting-card.component.css']
})
export class SinglePostingCardComponent {

  @Input() posting!: Posting;

  constructor(private location: Location, public dialogPanel: MatDialog) {
  }

  showPostDetails() {

    //this.location.go('/posting/' + this.posting.id);
    console.log(this.posting);

    this.dialogPanel.open(PostingDetailComponent, {
      width: 'auto',
      height: 'auto',
      data: {
        posting: this.posting
      }

    }).afterClosed().subscribe(
      result => {
        //this.location.go('/');
      }
    );

  }
}
