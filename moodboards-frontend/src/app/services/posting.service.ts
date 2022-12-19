import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Posting} from "../models/posting";
import {map} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PostingService {

  private strapiUrl = 'http://localhost:1337';
  private strapiPostingUrl = 'http://localhost:1337/api/postings';

  constructor(private http: HttpClient) {}

  //----------Ohne Authentifizierung----------
  getAllPostings() {
    return this.http.get<Posting[]>(this.strapiPostingUrl + '?populate=*')
      .pipe(
        map((res: any) => { //der respons der vom server zurück kommt wird "gemapt", um einfacher an die Infos zu kommen. am anfang vom respone steht dieses "data{...}" und so können wir direkt hineins in das "..." greifen ohne dan das data davor zu denken
          return res.data;
        }),
      map((posting: Posting[]) => {
        return posting.map((posting) => {
          posting.attributes.image.data.attributes.url = this.strapiUrl + posting.attributes.image.data.attributes.url; //  http://localhost:1337/uploads/Bilddatei.jpg", -> gibt uns das Bild
          return posting;
        })
      }));
  }


  getOnePosting(Id: number) {
    console.log("[POSTING-SERVICE] get one Postings function")
  }

  getAllPostingsInMoodboard(moodboardId: number) {
    return this.http.get<Posting[]>(this.strapiPostingUrl + '?populate=*&filters[moodboards][id]=' + moodboardId)
      .pipe(
        map((res: any) => { //der respons der vom server zurück kommt wird "gemapt", um einfacher an die Infos zu kommen. am anfang vom respone steht dieses "data{...}" und so können wir direkt hineins in das "..." greifen ohne dan das data davor zu denken
          return res.data;
        }),
        map((posting: Posting[]) => {
          return posting.map((posting) => {
            posting.attributes.image.data.attributes.url = this.strapiUrl + posting.attributes.image.data.attributes.url; //  http://localhost:1337/uploads/Bilddatei.jpg", -> gibt uns das Bild
            return posting;
          })
        }));
  }

  //----------Mit Authentifizierung----------
  createPosting(posting: any){
    console.log("[POSTING-SERVICE] create Postings function: " + posting);

    return this.http.post<any>(this.strapiPostingUrl, posting).subscribe((res:any)=> console.log(res.data));

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
