import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { AuthService } from "../shared/services/auth.service";
import { MatMenuTrigger } from '@angular/material/menu';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';

@Component({
  selector: 'app-user-avatar',
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.css']
})
export class UserAvatarComponent implements OnInit {
  private readonly defaultAvatarUrl: string = "../assets/images/default_account.png";
  public avatarUrl: string = this.defaultAvatarUrl;
  private user: firebase.User;

  @ViewChild('trigger') public menuTrigger: MatMenuTrigger;

  constructor(public dialog: MatDialog, public authService: AuthService, private auth: AngularFireAuth) { }

  ngOnInit(): void {
    this.auth.authState.subscribe((user) => {
      this.user = user;
      this.updateAvatar(user != null);
    });
  }

  private setDefaultAvatar() {
    this.avatarUrl = this.defaultAvatarUrl;
  }

  private setAvatar() {
    this.avatarUrl = this.user.photoURL;
  }

  private updateAvatar(authenticated: boolean) {
    if (authenticated)
      this.setAvatar();
    else
      this.setDefaultAvatar();
  }

  onAvatarClicked() {
    this.authService.isLoggedIn.then((logged_in) => {
      if (logged_in)
        this.menuTrigger.openMenu();
      else
        this.authService.googleAuth();
    })
  }

  onSignOutClicked() {
    this.authService.signOut();
  }
}
