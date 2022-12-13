import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PostingService {

  private strapiPostingUrl = 'http://localhost:1337/api/postings';

  constructor(private  http: HttpClient) { }

  //----------Ohne Authentifizierung----------
  getAllPostings(){
    console.log("[POSTING-SERVICE] get all Postings function")
  }

  getOnePosting(){
    console.log("[POSTING-SERVICE] get one Postings function")
  }

  //----------Mit Authentifizierung----------
  getAllUsersPostings(){
    console.log("[POSTING-SERVICE] get all Users Postings function")
  }

  updatePosting(){
    console.log("[POSTING-SERVICE] update Postings function")
  }

  deletePosting(){
    console.log("[POSTING-SERVICE] delete Postings function")
  }
}
