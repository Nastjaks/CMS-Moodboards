import {Component, Input} from '@angular/core';
import {Posting} from "../../../models/posting";
import {PostingDetailComponent} from "../posting-detail-dialog/posting-detail.component";
import {MatDialog} from "@angular/material/dialog";


@Component({
  selector: 'app-single-posting-card',
  templateUrl: './single-posting-card.component.html',
  styleUrls: ['./single-posting-card.component.css']
})
export class SinglePostingCardComponent {

  @Input() posting!: Posting;

  constructor(public dialogPanel: MatDialog) {  }

  showPostDetails() {
    this.dialogPanel.open(PostingDetailComponent, {
      data: {
        posting: this.posting
      }
    });
  }
}
