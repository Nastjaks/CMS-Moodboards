import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Blogpost} from "../../../models/blogpost";
import {BlogpostService} from "../../../services/blogpost.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-blog-overview',
  templateUrl: './blog-overview.component.html',
  styleUrls: ['./blog-overview.component.css']
})
export class BlogOverviewComponent implements OnInit{

  blogpost$!: Observable<Blogpost[]>;

  constructor(private blogpostService: BlogpostService, private router: Router) {}

  ngOnInit(): void {
    this.blogpost$ = this.blogpostService.getAllBlogposts();
  }

  showDetails(Id: number) {
    this.router.navigateByUrl('/academy/' + Id );
  }
}
