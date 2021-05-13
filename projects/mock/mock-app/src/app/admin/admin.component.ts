import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: [ './admin.component.css' ]
})
export class AdminComponent implements OnInit {
  private title: string = "Панель адміна";
  public is_page_loaded$: Observable<boolean>;

  constructor(private authService: AuthService, public router: Router) {
  }

  ngOnInit() {
    this.is_page_loaded$ = new Observable(subscriber => {
      this.authService.authStateObserver.subscribe(
        logged_in => {
          if (!logged_in)
            this.router.navigate(["/dashboard"]);
          subscriber.next(logged_in);
        }
      )
    })
  }
}
