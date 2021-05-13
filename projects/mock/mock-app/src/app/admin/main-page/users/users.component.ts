import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/User';
import { DataService } from 'src/app/shared/services/data.service';
import { PageLoaderComponent } from '../../../shared/components/page-loader/page-loader.component'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  users$: Observable<User[]>;
  constructor(private dataService: DataService) {
    this.users$ = dataService.users;
  }
}
