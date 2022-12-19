import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Moodboard} from "../models/moodboard";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MoodboardService {

  private strapiUrl = 'http://localhost:1337';
  private strapiMoodboardUrl = 'http://localhost:1337/api/moodboards';

  constructor(private http: HttpClient) {
  }

  //----------Ohne Authentifizierung----------
  getAllMoodboards() {
    console.log("[MOODBOARD-SERVICE] get all Moodboards function")
    return this.http.get<Moodboard[]>(this.strapiMoodboardUrl + '?populate[postings][populate][0]=image&filters[private]=false')
      .pipe(
        map((res: any) => {
          return res.data;
        }),
        map((moodboard: Moodboard[]) => {
          return moodboard.map((moodboard) => {
            moodboard.attributes.postings.data.map((data) => {
              data.attributes.image.data.attributes.url = this.strapiUrl + data.attributes.image.data.attributes.url;
              return data.attributes.image.data.attributes.url;
            })
            return moodboard;
          })
        })
      );
  }

  getOneMoodboard() {
    console.log("[MOODBOARD-SERVICE] get one Moodboard function")
  }

  //----------Mit Authentifizierung----------

  addImgToMoodboard(imgId: number, moodboardId: string) {
    console.log("[MOODBOARD-SERVICE] add image: " + imgId + " to Moodboard: " + moodboardId + " function")
  }

  removeImgFromMppdboard(imgId: number, moodboardId: number) {
    console.log("[MOODBOARD-SERVICE] remoove image: " + imgId + " from Moodboard: " + moodboardId + " function")
  }

  updateMoodboard(moodboardId: number) {
    console.log("[MOODBOARD-SERVICE] update Moodboard function")
  }

  deleteMoodboard(moodboardId: number) {
    console.log("[MOODBOARD-SERVICE] delete Moodboard function")
  }
}
