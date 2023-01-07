import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Moodboard} from "../models/moodboard";
import {catchError, map, Observable} from "rxjs";
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


  getOneMoodboard(id: number) {
    console.log("[MOODBOARD-SERVICE] get one Moodboard " + id + " function")

    return this.http.get<Moodboard>(this.urls.moodboard_URL + '/' + id + '?populate[postings][populate][0]=image&populate[moodboard_creator][populate]').pipe(
      map((res: any) => {
        return res.data;
      }),

    )
  }

  //----------Mit Authentifizierung----------
  createMoodboard(moodboard: any, jwt: string) {
    console.log("[MOODBOARD-SERVICE] create Moodboards function " + moodboard.title);

    const headers = {
      'content-type': 'application/json',
      'Authorization': 'Bearer ' + jwt,
    };

    return this.http.post<any>(this.urls.moodboard_URL, {
      data: {
        title: moodboard.title,
        description: moodboard.description,
        moodboard_creator: moodboard.moodboard_creator,
        private: moodboard.visibilityPrivate
      }
    }, {'headers': headers}).subscribe(
      res => console.log(res)
    )

  }

  addImgToMoodboard(imgId: number, moodboardId: number, jwt: string) {
    console.log("[MOODBOARD-SERVICE] add image: " + imgId + " to Moodboard: " + moodboardId + " function");

    let postings: number[] = [];

    this.http.get<number[]>(this.urls.postings_URL + '?populate=*&filters[moodboards][id]=' + moodboardId)
      .subscribe((res: any) => {
          for (let i = 0; i < res.data.length; i++) {
            postings.push(res.data[i].id);
          }
          postings.push(imgId);

          const headers = {
            'content-type': 'application/json',
            'Authorization': 'Bearer ' + jwt,
          };

          const body = JSON.stringify({
            data: {postings: postings}
          });

          return this.http.put<Moodboard>(this.urls.moodboard_URL + '/' + moodboardId, body, {'headers': headers}).subscribe()
        }
      )
  }

  removeImgFromMoodboard(imgId: number, moodboardId: number, jwt: string) {
    console.log("[MOODBOARD-SERVICE] remove image: " + imgId + " from Moodboard: " + moodboardId + " function");

    let postings: number[] = [];

    this.http.get<number[]>(this.urls.postings_URL + '?populate=*&filters[moodboards][id]=' + moodboardId)
      .subscribe((res: any) => {
          for (let i = 0; i < res.data.length; i++) {
            postings.push(res.data[i].id);
          }

          for (var i = 0; i < postings.length; i++) {
            if (postings[i] === imgId) {
              postings.splice(i, 1);
            }
          }
          console.log(postings);

          const headers = {
            'content-type': 'application/json',
            'Authorization': 'Bearer ' + jwt,
          };

          const body = JSON.stringify({
            data: {postings: postings}
          });

          return this.http.put<Moodboard>(this.urls.moodboard_URL + '/' + moodboardId, body, {'headers': headers}).subscribe()
        }
      )
  }

  updateMoodboard(moodboardId: number, moodboard: any, jwt: string) {
    console.log("[MOODBOARD-SERVICE] update Moodboard " + moodboardId + " function")

    const headers = {
      'content-type': 'application/json',
      'Authorization': 'Bearer ' + jwt
    };

    return this.http.put<Moodboard>(this.urls.moodboard_URL + '/' + moodboardId, {
      data: {
        title: moodboard.title,
        description: moodboard.description,
        private: moodboard.visibilityPrivate
      }
    }, {'headers': headers}).subscribe(
      res => console.log(res))
  }

  /*
  changeVisibility(moodboard: Moodboard, jwt: string, visibilityPrivate: boolean) {
    console.log("[MOODBOARD-SERVICE] make Moodboard: " + moodboard.id + " private " + visibilityPrivate)

    const headers = {
      'content-type': 'application/json',
      'Authorization': 'Bearer ' + jwt
    };

    const body = JSON.stringify({
      data: {
        private: visibilityPrivate
      }
    });

    return this.http.put<Moodboard>(this.urls.moodboard_URL + '/' + moodboard.id, body,
      {'headers': headers})
      .pipe(
        catchError((err) => {
            console.error(err);
            throw err;
          }
        )
      );
  }*/

  deleteMoodboard(moodboardId: number, jwt: string) {
    console.log("[MOODBOARD-SERVICE] delete Moodboard function")

    const headers = {
      'Authorization': 'Bearer ' + jwt,
    };

    return this.http.delete(this.urls.moodboard_URL + '/' + moodboardId,
      {'headers': headers})
      .pipe(
        catchError((err) => {
            console.error(err);
            throw err;
          }
        )
      );
  }


}
