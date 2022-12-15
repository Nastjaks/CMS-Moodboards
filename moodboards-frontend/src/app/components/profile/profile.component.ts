import { Component, OnInit } from '@angular/core';
import {StorageService} from "../../services/storage.service";
import {Auth_Model} from "../../models/auth_Model";
import {UserService} from "../../services/user.service";
import {Observable} from "rxjs";
import {Posting} from "../../models/posting";
import {Moodboard} from "../../models/moodboard";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

  currentUser!: Auth_Model;
  posting$!: Observable<Posting[]>;
  moodboard$!: Observable<Moodboard[]>;


  constructor(private storageService: StorageService, private userService: UserService) { }

  ngOnInit(): void {
    this.currentUser = this.storageService.getUser();
    this.posting$ = this.userService.getAllUserPostings(this.currentUser.user.id);
    this.moodboard$ = this.userService.getAllUserMoodbards(this.currentUser.user.id);
  }
}
