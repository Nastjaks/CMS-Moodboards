import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Moodboard} from "../models/moodboard";
import {map} from "rxjs";
import {Urls} from "../helper/urls";

@Injectable({
  providedIn: 'root'
})
export class MoodboardService {


  constructor(private http: HttpClient, private urls: Urls) {
  }

  //----------Ohne Authentifizierung----------
  getAllMoodboards() {
    console.log("[MOODBOARD-SERVICE] get all Moodboards function")
    return this.http.get<Moodboard[]>(this.urls.moodboard_URL + '?populate[postings][populate][0]=image&populate[moodboard_creator][populate]&filters[private]=false')
      .pipe(
        map((res: any) => {
          return res.data;
        }),
        map((moodboard: Moodboard[]) => {
          return moodboard.map((moodboard) => {
            moodboard.attributes.postings.data.map((data) => {
              data.attributes.image.data.attributes.url = this.urls.strapi_URL + data.attributes.image.data.attributes.url;
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

  removeImgFromMoodboard(imgId: number, moodboardId: number) {
    console.log("[MOODBOARD-SERVICE] remove image: " + imgId + " from Moodboard: " + moodboardId + " function")
  }

  updateMoodboard(moodboardId: number) {
    console.log("[MOODBOARD-SERVICE] update Moodboard function")
  }

  deleteMoodboard(moodboardId: number) {
    console.log("[MOODBOARD-SERVICE] delete Moodboard function")
  }
}
