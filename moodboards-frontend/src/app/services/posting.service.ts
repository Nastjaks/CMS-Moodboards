import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Posting} from "../models/posting";
import {map} from 'rxjs';
import {Urls} from "../helper/urls";

@Injectable({
  providedIn: 'root'
})
export class PostingService {

  constructor(private http: HttpClient, private urls: Urls) {
  }

  //----------Ohne Authentifizierung----------
  getAllPostings() {
    return this.http.get<Posting[]>(this.urls.postings_URL + '?populate=*')
      .pipe(
        map((res: any) => {
          return res.data;
        }),
        map((posting: Posting[]) => {
          return posting.map((posting) => {
            posting.attributes.image.data.attributes.url = this.urls.strapi_URL + posting.attributes.image.data.attributes.url;
            return posting;
          })
        }));
  }


  getOnePosting(Id: number) {
    console.log("[POSTING-SERVICE] get one Postings function")
  }

  getAllPostingsInMoodboard(moodboardId: number) {
    return this.http.get<Posting[]>(this.urls.postings_URL + '?populate=*&filters[moodboards][id]=' + moodboardId)
      .pipe(
        map((res: any) => {
          return res.data;
        }),
        map((posting: Posting[]) => {
          return posting.map((posting) => {
            posting.attributes.image.data.attributes.url = this.urls.strapi_URL + posting.attributes.image.data.attributes.url;
            return posting;
          })
        }));
  }

  //----------Mit Authentifizierung----------
  createPosting(posting: any, formData: FormData, jwt: string) {
    const headers = {
      'content-type': 'application/json', //multipart/form-data
      'Authorization': 'Bearer ' + jwt,
    };

    const headersX = {
      'Authorization': 'Bearer ' + jwt,
    };



    return this.http.post<any>( 'http://localhost:1337/api/upload', formData,{'headers': headersX }  ).subscribe(res =>{
        const body = JSON.stringify({
          data:{
          title: posting.title,
          description: posting.description,
          posting_creator: posting.posting_creator,
          tag: posting.tag,
          image:res[0].id}
        });

        return this.http.post<any>(this.urls.postings_URL, body, {'headers': headers}).subscribe(res => console.log(res));
    }

    );
  }

  getAllUsersPostings() {
    console.log("[POSTING-SERVICE] get all Users Postings function")
  }

  updatePosting(Id: number) {
    console.log("[POSTING-SERVICE] update Postings function")
  }

  deletePosting(Id: number) {
    console.log("[POSTING-SERVICE] delete Postings function")
  }

}
