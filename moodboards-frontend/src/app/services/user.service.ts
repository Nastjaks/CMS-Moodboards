import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs';
import {Posting} from "../models/posting";
import {Moodboard} from "../models/moodboard";

const strapiUrl = 'http://localhost:1337';
const strapiPostingUrl = 'http://localhost:1337/api/postings';
const strapiMoodboardUrl = 'http://localhost:1337/api/moodboards';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAllUserPostings(id: number){
    return this.http.get<Posting[]>(strapiPostingUrl + '?populate=*&filters[posting_creator][id]='+ id )
      .pipe(
        map((res: any) => {
          return res.data;
        }),
        map((posting: Posting[]) => {
          return posting.map((posting) => {
            posting.attributes.image.data.attributes.url = strapiUrl + posting.attributes.image.data.attributes.url;
            return posting;
          })
        }));
  }

  getAllUserMoodbards(id: number) {
    console.log("[MOODBOARD-SERVICE] get all Moodboards function")
    return this.http.get<Moodboard[]>(strapiMoodboardUrl + '?populate[postings][populate][0]=image&filters[moodboard_creator][id]='+ id)
      .pipe(
        map((res: any) => {
          console.log(res.data);
          return res.data;
        }),
        map((moodboard: Moodboard[])=> {
          return moodboard.map((moodboard) => {
            moodboard.attributes.postings.data.map((data) =>{
              data.attributes.image.data.attributes.url = strapiUrl + data.attributes.image.data.attributes.url;
              console.log(data.attributes.image.data.attributes.url);
              return data.attributes.image.data.attributes.url;
            })
            return moodboard;
          })
        })
      );
  }
}
