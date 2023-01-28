import {Component, OnInit} from '@angular/core';
import {Blogpost} from "../../../models/blogpost";
import {BlogpostService} from "../../../services/blogpost.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-blog-overview',
  templateUrl: './blog-overview.component.html',
  styleUrls: ['./blog-overview.component.css']
})
export class BlogOverviewComponent implements OnInit{

  blogpost$!: Blogpost[];

  constructor(private blogpostService: BlogpostService, private router: Router) {}

  ngOnInit(): void {
    this.blogpostService.getAllBlogposts().subscribe((res)=>{
      this.blogpost$ = res;
    });
  }

  showDetails(Id: number) {
    this.router.navigateByUrl('/academy/' + Id );
  }
}
