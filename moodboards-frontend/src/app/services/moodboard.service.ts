import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class MoodboardService {

  private strapiMoodboardUrl = 'http://localhost:1337/api/moodboards';

  constructor(private  http: HttpClient) { }

  //----------Ohne Authentifizierung----------
  getAllMoodboards(){
    console.log("[MOODBOARD-SERVICE] get all Moodboards function")
  }

  getOneMoodboard(){
    console.log("[MOODBOARD-SERVICE] get one Moodboard function")
  }

  //----------Mit Authentifizierung----------
  updateMoodboard(){
    console.log("[MOODBOARD-SERVICE] update Moodboard function")
  }

  deleteMoodboard(){
    console.log("[MOODBOARD-SERVICE] delete Moodboard function")
  }
}
