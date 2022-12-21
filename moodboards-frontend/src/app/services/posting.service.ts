import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Posting} from "../models/posting";
import {catchError, map} from 'rxjs';
import {Urls} from "../helper/urls";
import {User} from "../models/user";

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

    const headersImg = {
      'Authorization': 'Bearer ' + jwt,
    };

    return this.http.post<any>(this.urls.upload_URL, formData, {'headers': headersImg})
      .subscribe(res => {
        const body = JSON.stringify({
          data: {
            title: posting.title,
            description: posting.description,
            posting_creator: posting.posting_creator,
            tag: posting.tag,
            image: res[0].id
          }
        });

        return this.http.post<any>(this.urls.postings_URL, body, {'headers': headers})
          .subscribe(res =>
            console.log(res)
          );
      });
  }

  editPosting(title: string, description: string, tag: string, id: number, jwt: string) {
    console.log("[POSTING-SERVICE] update Postings function")
    const headers = {
      'content-type': 'application/json',
      'Authorization': 'Bearer ' + jwt,
    };
    const body = JSON.stringify({
      data: {
        title: title,
        description: description,
        tag: tag
      }
    });

    return this.http.put<Posting>(this.urls.postings_URL + '/' + id, body,
      {'headers': headers})
      .pipe(
        catchError((err) => {
            console.error(err);
            throw err;
          }
        )
      );
  }

  deletePosting(id: number, jwt: string) {
    const headers = {
      'Authorization': 'Bearer ' + jwt,
    };

    return this.http.delete(this.urls.postings_URL + '/' +  id,
      {'headers': headers})
      .pipe(
        catchError((err) => {
            console.error(err);
            throw err;
          }
        )
      );
  }

  deleteImage(id: number, jwt: string) {
    const headersImg = {
      'Authorization': 'Bearer ' + jwt,
    };

    return this.http.delete(this.urls.upload_URL + '/files/' + id, {'headers': headersImg})
      .pipe(
        catchError((err) => {
            console.error(err);
            throw err;
          }
        )
      );
  }
}
