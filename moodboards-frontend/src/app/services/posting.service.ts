import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Posting} from "../models/posting";
import {catchError, map} from 'rxjs';
import {Urls} from "../helper/urls";

@Injectable({
  providedIn: 'root'
})
export class PostingService {

  constructor(private http: HttpClient, private urls: Urls) {
  }

  //----------without authentication----------//
  /**
   * GET ALL POSTINGS
   */
  getAllPostings() {
    console.log("[POSTING-SERVICE] get all Postings function");

    return this.http.get<Posting[]>(this.urls.postings_URL + '?populate=*&sort[0]=id%3Adesc')
      .pipe(
        map((res: any) => {
          return res.data;
        }),
        map((posting: Posting[]) => {
          return posting.map((posting) => {
            posting.attributes.image.data.attributes.url = this.urls.strapi_URL + posting.attributes.image.data.attributes.url;
            return posting;
          })
        })
      );
  }

  /**
   * GET ONE POSTING
   * @param postId ID of the wanted posting
   */
  getOnePosting(postId: number) {
    console.log("[POSTING-SERVICE] get one Postings function");

    return this.http.get<Posting>(this.urls.postings_URL + '/' + postId + '?populate=*').pipe(
      map((res: any) => {
        return res.data
      }),
      map((posting:Posting)=>{
        posting.attributes.image.data.attributes.url = this.urls.strapi_URL + posting.attributes.image.data.attributes.url;
        return posting;
      })
    )
  }

  /**
   * GET ALL POSTINGS FROM A MOODBOARD TODO: WHY & MOVE
   * @param moodboardId ID of the moodboard from which the images are to be fetched.
   */
  getPostingsInMoodboard(moodboardId: number) {
    console.log("[POSTING-SERVICE] get all Postings in moodboard function");

    return this.http.get<Posting[]>(this.urls.postings_URL + '?populate=*&filters[moodboards][id]=' + moodboardId + '&sort[0]=id%3Adesc')
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

  /**
   * GET POSTINGS BY CATEGORY
   * @param category Category from which the postings are to be fetched
   */
  getPostingsByCategory(category: string) {
    console.log("[POSTING-SERVICE] get all Postings by category "+ category);

    return this.http.get<Posting[]>(this.urls.postings_URL + '?populate=*&filters[tag]=' + category + '&sort[0]=id%3Adesc')
      .pipe(
        map((res: any) => {
          return res.data;
        }),
        map((posting: Posting[]) => {
          return posting.map((posting) => {
            posting.attributes.image.data.attributes.url = this.urls.strapi_URL + posting.attributes.image.data.attributes.url;
            return posting;
          })
        })
      );
  }


  //----------with authentication----------//

  /**
   * CREATE POSTING
   * @param posting Information of th posting to be created
   * @param formData image that souls be uploaded and connected to the posting
   * @param jwt JWT if the user who create the posting
   */
  createPosting(posting: any, formData: FormData, jwt: string) {
    console.log("[POSTING-SERVICE] create Postings function");

    const headers = {
      'content-type': 'application/json',
      'Authorization': 'Bearer ' + jwt,
    };

    const headersImg = {
      'Authorization': 'Bearer ' + jwt,
    };

    return this.http.post<any>(this.urls.upload_URL, formData, {'headers': headersImg})
      .pipe(
        map((res => {
            const body = JSON.stringify({
              data: {
                title: posting.title,
                description: posting.description,
                posting_creator: posting.posting_creator,
                tag: posting.tag,
                image: res[0].id
              }
            });

            return this.http.post<any>(this.urls.postings_URL, body, {'headers': headers}).subscribe(() => {
            })
          }
        ))
      );
  }

  /**
   * EDIT POSTING TODO: Shorter
   * @param title posting title
   * @param description posting description
   * @param tag posting tag
   * @param id posting id
   * @param jwt JWT of user who edit the posting
   */
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

  /** DELETE POSTING
   * @param id ID of posing to delete
   * @param jwt JWT of user who delete the posting
   */
  deletePosting(postId: number, jwt: string) {
    console.log("[POSTING-SERVICE] delete Postings function")

    const headers = {
      'Authorization': 'Bearer ' + jwt,
    };

    return this.http.delete(this.urls.postings_URL + '/' + postId,
      {'headers': headers})
      .pipe(
        catchError((err) => {
            console.error(err);
            throw err;
          }
        )
      );
  }

  /**
   * DELETE IMAGE
   * @param imageId ID of image to delete
   * @param jwt JWT of user who delete the posting
   */
  deleteImage(imageId: number, jwt: string) {
    console.log("[POSTING-SERVICE] DELETE IMAGE")

    const headersImg = {
      'Authorization': 'Bearer ' + jwt,
    };

    return this.http.delete(this.urls.upload_URL + '/files/' + imageId, {'headers': headersImg})
      .pipe(
        catchError((err) => {
            console.error(err);
            throw err;
          }
        )
      );
  }
}
