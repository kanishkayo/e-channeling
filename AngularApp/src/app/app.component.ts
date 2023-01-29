import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './_services/token-storage.service';
import {Payhere, AccountCategory} from "payhere-js-sdk";
import { WebSocketService } from './web-socket.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'AngularApp';
  public roles: string;
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  showUserBoard = false;
  username?: string;

  constructor(private tokenStorageService: TokenStorageService, private webSocketService: WebSocketService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    console.log("isLogging",this.isLoggedIn, !!this.tokenStorageService.getToken());


    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      console.log("roles",this.roles, this.roles.length);

      this.showAdminBoard = this.roles.includes('admin');
      this.showUserBoard = this.roles.includes('user');
      this.showModeratorBoard = this.roles.includes('doctor');

      this.username = user.username;
      // window.location.reload();
    }
    Payhere.init("1222006",AccountCategory.SANDBOX);
    // this.webSocketService.listen('typing').subscribe((data) => console.log("SAmple--",data));
  }

  logout(): void {
    this.tokenStorageService.signOut();
    // this.webSocketService.emit('typing', "sample");
    window.location.reload();
    
  }
}
