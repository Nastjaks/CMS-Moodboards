import {Injectable} from "@angular/core";

@Injectable()
export class Urls {
  strapi_URL: string = 'http://localhost:1337';
  auth_URL: string = 'http://localhost:1337/api/auth/';

  users_URL: string = 'http://localhost:1337/api/users/';
  moodboard_URL: string = 'http://localhost:1337/api/moodboards';
  postings_URL: string = 'http://localhost:1337/api/postings';
}

