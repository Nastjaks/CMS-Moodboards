import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Moodboard} from "../models/moodboard";
import {catchError, map} from "rxjs";
import {Urls} from "../helper/urls";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class MoodboardService {

  constructor(private http: HttpClient, private urls: Urls, private userservice: UserService) {
  }

  //----------without authentication----------//

  /**
   * GET ALL MOODBOARDS
   */
  getAllMoodboards() {
    console.log("[MOODBOARD-SERVICE] get all Moodboards function")
    return this.http.get<Moodboard[]>(this.urls.moodboard_URL + '?populate[postings][populate][0]=image&populate[moodboard_creator][populate]&filters[private]=false&sort[0]=id%3Adesc')
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
   * GET ONE MOODBOARD
   * @param moodboardId ID of the wanted moodboard
   */
  getOneMoodboard(moodboardId: number) {
    console.log("[MOODBOARD-SERVICE] get one Moodboard " + moodboardId + " function")

    return this.http.get<Moodboard>(this.urls.moodboard_URL + '/' + moodboardId + '?populate[postings][populate][0]=image&populate[moodboard_creator][populate]')
      .pipe(
        map((res: any) => {
          return res.data;
        }),
      ).pipe(
        catchError((err) => {
            console.log(err)
            throw err;
          }
        )
      );
  }

  /**
   * GET ALL CO-CREATORS OF A MOODBOARD TODO: add co creator to model to remove the get
   * @param moodboardId ID of the moodboard from which the co-creators are retrieved.
   */
  getAllCoCreators(moodboardId: number) {
    console.log("[MOODBOARD-SERVICE] get All Moodboard Creators " + moodboardId);

    return this.http.get<Moodboard>(this.urls.moodboard_URL + '/' + moodboardId + '?populate[co_creators][populate]').pipe(
      map((res: any) => {
        return res.data.attributes.co_creators.data;
      }),
    )
  }


  //----------with authentication----------//

  /**
   * CREATE A MOODBOARD
   * @param moodboard Information of the moodboard to be created
   * @param jwt JWT of the user who creates the moodboard
   */
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
    }, {'headers': headers}).pipe(
      map(() => {
      })
    )

  }

  /**
   * ADD A POSTING TO A MOODBOARD
   * @param imgId ID of the post to be added to the moodboard
   * @param moodboardId  ID of the moodboard to add a post to
   * @param jwt JWT of the user who add the posting to the moodboard
   */
  addImgToMoodboard(imgId: number, moodboardId: number, jwt: string) {
    console.log("[MOODBOARD-SERVICE] add image: " + imgId + " to Moodboard: " + moodboardId + " function");

    let postings: number[] = [];

    return this.http.get<number[]>(this.urls.postings_URL + '?populate=*&filters[moodboards][id]=' + moodboardId)
      .pipe(
        map((res: any) => {
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
        })
      )
  }

  /**
   * REMOVE A POSTING FROM MOODBOARD
   * @param imgId ID of the post to be removed to the moodboard
   * @param moodboardId ID of the moodboard to remove the post
   * @param jwt JWT of the user who remove the posting from the moodboard
   */
  removeImgFromMoodboard(imgId: number, moodboardId: number, jwt: string) {
    console.log("[MOODBOARD-SERVICE] remove image: " + imgId + " from Moodboard: " + moodboardId + " function");

    let postings: number[] = [];

    return this.http.get<number[]>(this.urls.postings_URL + '?populate=*&filters[moodboards][id]=' + moodboardId)
      .pipe(
        map((res: any) => {
            for (let i = 0; i < res.data.length; i++) {
              postings.push(res.data[i].id);
            }

            for (let i = 0; i < postings.length; i++) {
              if (postings[i] === imgId) {
                postings.splice(i, 1);
              }
            }

            const headers = {
              'content-type': 'application/json',
              'Authorization': 'Bearer ' + jwt,
            };

            const body = JSON.stringify({
              data: {postings: postings}
            });

            return this.http.put<Moodboard>(this.urls.moodboard_URL + '/' + moodboardId, body, {'headers': headers}).subscribe(() => {
            })
          }
        )
      )
  }

  /**
   * UPDATE MOODBOARD INFORMATION
   * @param moodboardId ID of the moodboard to be updated
   * @param moodboard Information of the moodboard to be updated
   * @param jwt JWT of the user who edit the moodboard information
   */
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
    }, {'headers': headers}).pipe(
      map((res) => {
      })
    )
  }

  /**
   * DELETE A MOODBOARD
   * @param moodboardId ID of the moodboard to be deleted
   * @param jwt JWT of the user who delete the moodboard
   */
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

  /**
   * ADD A CO-CREATOR TO A MOODBOARD
   * @param coCreatorName name of the user to be added as co-creator to the moodboard
   * @param moodboardId ID of the moodboard to which the user should be added
   * @param jwt JWT of the user who add the co-creator
   */
  addCoCreator(coCreatorName: string, moodboardId: number, jwt: string) {
    console.log("[MOODBOARD-SERVICE] add Co-Creators Moodboards  " + moodboardId);

    return this.userservice.getUserByName(coCreatorName).pipe(map((resUserId) => {

      if (resUserId == "User not found") {
        return resUserId
      } else {
        let coCreators: number[] = [];

        this.getAllCoCreators(moodboardId).subscribe(coCreator => {

          for (let i = 0; i < coCreator.length; i++) {
            coCreators.push(coCreator[i].id)
          }

          coCreators.push(resUserId)

          const headers = {
            'content-type': 'application/json',
            'Authorization': 'Bearer ' + jwt,
          };

          const body = JSON.stringify({
            data: {co_creators: coCreators}
          });

          return this.http.put<Moodboard>(this.urls.moodboard_URL + '/' + moodboardId, body, {'headers': headers}).subscribe(() => {
            window.location.reload();
          })
        })
      }
    }))
  }

  //REMOVE A CO-CREATOR FROM MOODBOARD
  /**
   *
   * @param coCreatorId name of the user to be removed as co-creator from the moodboard
   * @param moodboardId ID of the moodboard from which the user should be removed
   * @param jwt JWT of the user who remove the co-creator
   */
  removeCoCreator(coCreatorId: number, moodboardId: number, jwt: string) {
    console.log("[MOODBOARD-SERVICE] remove Co-Creators Moodboards  " + moodboardId);

    let coCreators: number[] = [];

    this.getAllCoCreators(moodboardId).subscribe(coCreator => {

      for (let i = 0; i < coCreator.length; i++) {
        if (coCreatorId != coCreator[i].id) {
          coCreators.push(coCreator[i].id)
        }
      }

      const headers = {
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + jwt,
      };

      const body = JSON.stringify({
        data: {co_creators: coCreators}
      });

      return this.http.put<Moodboard>(
        this.urls.moodboard_URL + '/' + moodboardId, body, {'headers': headers}).subscribe(() => {
        window.location.reload(); //TODO
      })
    })


  }

}
