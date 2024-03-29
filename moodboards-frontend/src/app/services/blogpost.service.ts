import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Urls} from "../helper/urls";
import {Blogpost} from "../models/blogpost";
import {map} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class BlogpostService {

  constructor(private http: HttpClient, private urls: Urls) { }

  /**
   * GET ALL ACADEMY POSTS
   */
  getAllBlogposts(){
    console.log("[BLOGPOST-SERVICE] get all Blogposts function");
    return this.http.get<Blogpost[]>(this.urls.blogposts_URL + '?populate=*&sort[0]=id%3Adesc').pipe(
        map((res: any) => {
          return res.data;
        }),
        map((blogpost: Blogpost[]) => {
          return blogpost.map((blogpost) => {
            blogpost.attributes.thumbnail.data.attributes.url = this.urls.strapi_URL + blogpost.attributes.thumbnail.data.attributes.url;
            return blogpost;
          })
        })
      );
  }

  /**
   * GET ONE ACADEMY POSTS BY ID
   * @param blogId - ID of the wanted post
   */
  getOneBlogposts(blogId: number){
    console.log("[BLOGPOST-SERVICE] get one Blogposts function " + blogId);

    return this.http.get<Blogpost>(this.urls.blogposts_URL + '/' + blogId + '?populate=*').pipe(
      map((res: any) => {
        return res.data;
      }),
      map((blogpost: Blogpost) => {
        blogpost.attributes.thumbnail.data.attributes.url = this.urls.strapi_URL + blogpost.attributes.thumbnail.data.attributes.url;
        return blogpost
      })
    )
  }

}
