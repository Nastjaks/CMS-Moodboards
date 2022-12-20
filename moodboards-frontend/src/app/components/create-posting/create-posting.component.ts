import {Component, Inject, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {PostingDetailComponent} from "../posting-detail/posting-detail.component";
import {PostingService} from "../../services/posting.service";
import {Auth_Model} from "../../models/auth_Model";

@Component({
  selector: 'app-create-posting',
  templateUrl: './create-posting.component.html',
  styleUrls: ['./create-posting.component.css']
})
export class CreatePostingComponent {

  user!: Auth_Model;

  title!: string;
  description!: string;
  tag!: string;

  imageFile!: File;
  formData = new FormData();


  constructor(public dialogRef: MatDialogRef<PostingDetailComponent>,
              private postingService: PostingService,
              @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
    this.user = data.user;
  }

  addPosting(): void {

    const posting: {} = {
        title: this.title,
        description: this.description,
        tag: this.tag,
        posting_creator: this.user.user.id

    }

    this.postingService.createPosting(posting, this.formData, this.user.jwt);

    this.title = '';
    this.tag = '';
    this.description = '';

  }

  getFile(files: FileList | string | string[] | File[]) {
    this.imageFile = <File>files[0]
    this.formData.append('files', this.imageFile, this.imageFile.name);
    console.log(this.formData);
  }


}
