import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {BlogpostService} from "../../../services/blogpost.service";
import {Blogpost} from "../../../models/blogpost";

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent implements OnInit {

  blogpost!: Blogpost;

  constructor(private blogpostService: BlogpostService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      if (params.id != null) {
        this.blogpostService.getOneBlogposts(params.id).subscribe(blogpost => this.blogpost = blogpost);
      }
    })
  }

}
