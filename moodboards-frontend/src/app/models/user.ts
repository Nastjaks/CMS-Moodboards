import {Posting} from "./posting";
import {Moodboard} from "./moodboard";

export interface User {
  id: number;
  username: string;
  email: string;
  password: string
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: Date;
  updatedAt: Date;
  description: string;
  postings: Posting[];
  moodboards: Moodboard[];
}
