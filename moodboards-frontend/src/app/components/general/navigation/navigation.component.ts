import {Component, OnInit} from '@angular/core';
import {StorageService} from "../../../services/storage.service";
import {AlertComponent} from "../alert/alert.component";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
  providers: [AlertComponent],
})
export class NavigationComponent implements OnInit{
  isLoggedIn = false;
  username?: string;

  constructor(private storageService: StorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();
  }

}
