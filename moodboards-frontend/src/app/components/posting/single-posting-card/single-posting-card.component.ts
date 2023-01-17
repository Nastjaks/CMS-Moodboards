import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Posting} from "../../../models/posting";

@Component({
  selector: 'app-single-posting-card',
  templateUrl: './single-posting-card.component.html',
  styleUrls: ['./single-posting-card.component.css']
})
export class SinglePostingCardComponent {

  @Input() posting!: Posting;
  @Output() showDetailsEvent: EventEmitter<number> = new EventEmitter();

  constructor() {
  }

  showPostDetails() {
    this.showDetailsEvent.emit(this.posting.id);
  }
}
