import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Posting} from "../../../models/posting";
import {PostingService} from "../../../services/posting.service";
import {ActivatedRoute} from "@angular/router";
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
              public dialogPanel: MatDialog) {}

  ngOnInit(): void {
    this.route.url.subscribe((params: any) => {
      this.route.params.subscribe((params: any) => {
        if (params.poId != null) {
          this.showPostDetails(params.poId);
        }
      })

      if (params.length == 2){
        this.posting$ = this.postingService.getAllPostingsByCategory(params[1].path);

      } else if(params.length == 1){
        this.posting$ = this.postingService.getAllPostings();
      }

    })
  }

  showPostDetails(poId: number) {
    this.location.go('postings/posting/' + poId)

    this.dialogPanel.open(PostingDetailComponent, {
      data: {
        postingID: poId
      }
    }).afterClosed().subscribe(() => {
      this.location.go('postings/')
    });
  }

  setActive(name: string) {
    //document.getElementById( "'"+name+"'")!.classList.add("active");
    //document.getElementById('moodboardNav')!.classList.remove("active");
  }

}
