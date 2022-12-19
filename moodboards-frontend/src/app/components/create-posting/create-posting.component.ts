import { Component } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {PostingDetailComponent} from "../posting-detail/posting-detail.component";
import {Posting} from "../../models/posting";
import {PostingService} from "../../services/posting.service";

@Component({
  selector: 'app-create-posting',
  templateUrl: './create-posting.component.html',
  styleUrls: ['./create-posting.component.css']
})
export class CreatePostingComponent {

  title!: string;
  description!: string;
  image!: File;
  tag!:string;



  constructor(public dialogRef: MatDialogRef<PostingDetailComponent>,
              private postingService: PostingService) {
  }

  addMovie(): void {

    const posting: {  } ={
      title: this.title,
      description: this.description,
      tag: this.tag,
      image: this.image,
    }

    console.log(posting)
    this.postingService.createPosting(posting);

    this.title = '';
    this.tag = '';
    this.description = '';

  }


  getFile(files: FileList | string | string[] | File[]) {
    this.image = <File>files[0]
  }

}
