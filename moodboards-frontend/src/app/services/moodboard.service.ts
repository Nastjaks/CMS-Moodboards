import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Moodboard} from "../models/moodboard";
import {map} from "rxjs";

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
    return this.http.get<Moodboard[]>(this.strapiMoodboardUrl + '?populate=*')
      .pipe(
        map((res: any) => { //der respons der vom server zurück kommt wird "gemapt", um einfacher an die Infos zu kommen. am anfang vom respone steht dieses "data{...}" und so können wir direkt hineins in das "..." greifen ohne dan das data davor zu denken
          return res.data;
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
