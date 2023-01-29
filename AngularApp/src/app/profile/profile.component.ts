import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from '../_services/token-storage.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: any;

  constructor(private token: TokenStorageService, public router:Router) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    if (Object.keys(this.currentUser).length == 0) {
      this.router.navigate(['login']);
    }
  }
}
