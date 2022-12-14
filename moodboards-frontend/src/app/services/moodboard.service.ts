import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Moodboard} from "../models/moodboard";
import {map} from "rxjs";
import {Moodboards} from "../models/posting";

@Injectable({
  providedIn: 'root'
})
export class MoodboardService {

  private strapiUrl = 'http://localhost:1337';
  private strapiMoodboardUrl = 'http://localhost:1337/api/moodboards';

  constructor(private  http: HttpClient) { }

  //----------Ohne Authentifizierung----------
  getAllMoodboards(){
    console.log("[MOODBOARD-SERVICE] get all Moodboards function")
    return this.http.get<Moodboard[]>(this.strapiMoodboardUrl + '?populate[postings][populate][0]=image')
      .pipe(
        map((res: any) => { //der respons der vom server zurück kommt wird "gemapt", um einfacher an die Infos zu kommen. am anfang vom respone steht dieses "data{...}" und so können wir direkt hineins in das "..." greifen ohne dan das data davor zu denken
          console.log(res.data);
          return res.data;
        }),
        map((moodboard: Moodboard[])=> {
          return moodboard.map((moodboard) => {
            moodboard.attributes.postings.data.map((data) =>{
              data.attributes.image.data.attributes.url = this.strapiUrl + data.attributes.image.data.attributes.url;
              console.log(data.attributes.image.data.attributes.url);
              return data.attributes.image.data.attributes.url;
            })
            return moodboard;
          })
        })
      );
  }

  getOneMoodboard(){
    console.log("[MOODBOARD-SERVICE] get one Moodboard function")
  }

  //----------Mit Authentifizierung----------
  updateMoodboard(){
    console.log("[MOODBOARD-SERVICE] update Moodboard function")
  }

  deleteMoodboard(){
    console.log("[MOODBOARD-SERVICE] delete Moodboard function")
  }
}
