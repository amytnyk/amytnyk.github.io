import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-page-loader',
  templateUrl: './page-loader.component.html',
  styleUrls: ['./page-loader.component.css']
})
export class PageLoaderComponent implements OnInit {
  @Input() is_page_loaded?: Observable<boolean>;
  public display_wrapper: boolean = true;
  public received_val: boolean = false;
  public readonly delay_time: number = 1000;
  public start_time: number;

  constructor() {
    console.log("AA");
    this.start_time = Date.now();
    setTimeout(() => {
      this.display_wrapper = !this.received_val;
    }, this.delay_time);
  }

  ngOnInit() {
    this.is_page_loaded?.subscribe(val => {
      this.received_val = val;
      if (Date.now() - this.start_time >= this.delay_time)
        this.display_wrapper = !val;
    })
  }
}
