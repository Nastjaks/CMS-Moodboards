import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map} from 'rxjs';
import {Posting} from "../models/posting";
import {Moodboard} from "../models/moodboard";
import {User} from "../models/user";
import {Urls} from "../helper/urls";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private urls: Urls) {
  }

  /**
   * GET USERS POSTINGS
   * @param creatorId ID of user
   */
  getAllUserPostings(creatorId: number) {
    console.log("[USER-SERVICE] get all Postings from user function");
    return this.http.get<Posting[]>(this.urls.postings_URL + '?populate=*&filters[posting_creator][id]=' + creatorId + '&sort[0]=id%3Adesc')
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
   * GET USERS MOODBOARDS
   * @param creatorId ID of user
   */
  getAllUserMoodboards(creatorId: number) {
    console.log("[USER-SERVICE] get all Moodboards from user function");
    return this.http.get<Moodboard[]>(this.urls.moodboard_URL + '?populate[postings][populate][0]=image&populate[moodboard_creator][populate]&filters[moodboard_creator][id]=' + creatorId + '&sort[0]=id%3Adesc')
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

  /**
   * GET ALL ACCESSABLE MOODBOARDS
   * @param creatorId ID of user
   */
  getAccessableMoodboards(creatorId: number) {
    console.log("[USER-SERVICE] get all Moodboards from user function");
    return this.http.get<Moodboard[]>(this.urls.moodboard_URL + '?populate[moodboard_creator][populate]&populate[co_creator][populate]&filters[$or][0][moodboard_creator][id][$eq]=' + creatorId + '&filters[$or][1][co_creators][id][$eq]=' + creatorId)
      .pipe(
        map((res: any) => {
          return res.data;
        }),
        map((moodboard: Moodboard[]) => {
          return moodboard.map((moodboard) => {
            return moodboard;
          })
        })
      );
  }

  /**
   * GET ALL MOODBOARD WHERE USER IS CO-CREATOR
   * @param userId ID of user
   */
  getAllCoMoodboards(userId: number) {
    console.log("[USER-SERVICE] get all Moodboards from user function");
    return this.http.get<Moodboard[]>(this.urls.moodboard_URL + '?populate[postings][populate][0]=image&populate[moodboard_creator][populate]&populate[co_creator][populate]&filters[co_creators][id]=' + userId + '&sort[0]=id%3Adesc')
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

  /**
   * GET USER INFORMATION
   * @param userId ID of user
   */
  getUserInformation(userId: number) {
    console.log("[USER-SERVICE] get Information from user function " + userId);

    return this.http.get<User[]>(this.urls.users_URL + userId)
      .pipe(
        map((res: any) => {
          return res;
        }),
        map((user: User) => {
          return user
        })
      )
  }

  /**
   * GET USER BY USERNAME
   * @param username name of user
   */
  getUserByName(username: string) {
    console.log("[USER-SERVICE] get Information by username user function " + username);
    return this.http.get<User[]>(this.urls.users_URL + "?filters[username]=" + username)
      .pipe(
        map((res: any) => {
          if (res.length > 0) {
            return res[0].id
          } else {
            return "User not found"
          }
        })
      )
  }

  /**
   * EDIT  USER INFORMATION TODO: SHORT
   * @param username
   * @param email
   * @param description
   * @param id ID of User
   * @param jwt  JWT of the user who edit
   */
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

  /**
   * DELETE USERS INFORMATION
   * @param userId
   * @param jwt
   */
  deleteUserInformation(userId: number, jwt: string) {
    console.log("[USER-SERVICE] get delete user function");
    const headers = {
      'Authorization': 'Bearer ' + jwt,
    };

    return this.http.delete(this.urls.users_URL + userId,
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
   * DELETE USERS MOODBOARDS
   * @param userId
   * @param jwt
   */
  deleteUserMoodboards(userId: number, jwt: string) {
    console.log("[USER-SERVICE] get delete users Moodboards function");
    const headers = {
      'Authorization': 'Bearer ' + jwt,
    };

    return this.http.delete(this.urls.moodboard_URL + '/' + userId,
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
