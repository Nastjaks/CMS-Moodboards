import {Component, Inject, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {PostingService} from "../../../services/posting.service";
import {Auth_Model} from "../../../models/auth_Model";
import {Router} from "@angular/router";
import {AlertComponent} from "../../general/alert/alert.component";

@Component({
  selector: 'app-posting-create-dialog',
  templateUrl: './create-posting.component.html',
  styleUrls: ['./create-posting.component.css'],
  providers: [AlertComponent],
})
export class CreatePostingComponent {

  user!: Auth_Model;

  title!: string;
  description!: string;
  tag!: string;

  imageFile!: File;
  formData = new FormData();

  constructor(private postingService: PostingService,
              private alert: AlertComponent,
              @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
              private router: Router,
              public dialogPanel: MatDialogRef<CreatePostingComponent>) {
    this.user = data.user;
  }

  addPosting(): void {

    if (this.title && this.imageFile) {

      const posting: {} = {
        title: this.title,
        description: this.description,
        tag: this.tag,
        posting_creator: this.user.user.id
      }
      this.postingService.createPosting(posting, this.formData, this.user.jwt).subscribe(() => {
        this.dialogPanel.close();
        this.alert.openAlert("Added new posting");
      })
    } else {
      this.alert.openAlert("Image and title are required");
    }

  }

  getFile(files: FileList | string | string[] | File[]) {

    this.imageFile = <File>files[0]
    this.formData.append('files', this.imageFile, this.imageFile.name);

    const preview = document.getElementById('preview') as HTMLImageElement;
    preview!.src = URL.createObjectURL(this.imageFile);
  }

  close() {
    this.router.navigate(["/profile"]).then(() => window.location.reload());
  }
}
