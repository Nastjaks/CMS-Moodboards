import {User} from "./user";

export interface Auth_Model {
  jwt: string;
  user: User;
}
