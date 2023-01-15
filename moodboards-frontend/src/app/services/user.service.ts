import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map} from 'rxjs';
import {Posting} from "../models/posting";
import {Moodboard} from "../models/moodboard";
import {User} from "../models/user";
import {Urls} from "../helper/urls";
import {StorageService} from "./storage.service";


@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private http: HttpClient, private urls: Urls, private storageService: StorageService) {
  }

  getAllUserPostings(id: number) {
    console.log("[USER-SERVICE] get all Postings from user function");
    return this.http.get<Posting[]>(this.urls.postings_URL + '?populate=*&filters[posting_creator][id]=' + id)
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

  getAllUserMoodboards(id: number) {
    console.log("[USER-SERVICE] get all Moodboards from user function");
    return this.http.get<Moodboard[]>(this.urls.moodboard_URL + '?populate[postings][populate][0]=image&populate[moodboard_creator][populate]&filters[moodboard_creator][id]=' + id)
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

  getUserInformation(id: number) {
    console.log("[USER-SERVICE] get Information from user function " + id); //TODO

    return this.http.get<User[]>(this.urls.users_URL + id)
      .pipe(
        map((res: any) => {
          return res;
        }),
      map((user: User) => {
        return user
      })
    )
  }

  editUserInformation(username: string, email: string, description: string, id: number, jwt: string) {
    console.log("[USER-SERVICE] edit user function");
    const headers = {
      'content-type': 'application/json',
      'Authorization': 'Bearer ' + jwt,
    };
    const body = JSON.stringify({
      username: username,
      email: email,
      description: description
    });


    return this.http.put<User>(this.urls.users_URL + id, body,
      {'headers': headers})
      .pipe(
        catchError((err) => {
            console.error(err);
            throw err;
          }
        )
      );
  };

  deleteUserInformation(id: number, jwt: string) {
    console.log("[USER-SERVICE] get delete user function");
    const headers = {
      'Authorization': 'Bearer ' + jwt,
    };

    return this.http.delete(this.urls.users_URL + id,
      {'headers': headers})
      .pipe(
        catchError((err) => {
            console.error(err);
            throw err;
          }
        )
      );
  }

  deleteUserMoodboards(id: number, jwt: string) {
    const headers = {
      'Authorization': 'Bearer ' + jwt,
    };

    return this.http.delete(this.urls.moodboard_URL + '/' + id,
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
