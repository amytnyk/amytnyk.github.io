import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { RegisterService } from './shared/services/register.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private readonly defaultAvatarUrl: string = "../assets/images/default_account.png";
  public avatarUrl: string = '';
  public displayPopup: boolean = false;
  private user: firebase.User;

  private isAuthenticated = (): boolean => this.user != null;

  private setDefaultAvatar() {
    this.avatarUrl = this.defaultAvatarUrl;
  }

  private setUserAvatar() {
    this.avatarUrl = this.user.photoURL;
  }

  private updateUserAvatar() {
    if (this.isAuthenticated())
      this.setUserAvatar();
    else
      this.setDefaultAvatar();
  }

  private updateUser() {
    this.updateUserAvatar();
  }

  constructor(private auth: AngularFireAuth, private registerService : RegisterService) {
    this.auth.authState.subscribe(user => {
      this.user = user;
      this.updateUser();
    });
  }

  onAvatarClicked() {
    if (!this.isAuthenticated()) {
      this.auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
        return this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      })
      .then(_ => { console.log("Success!"); })
      .catch(err => {console.log(err.message)});
    } else {
      // Show popup
      this.displayPopup = true;
    }
  }
}
