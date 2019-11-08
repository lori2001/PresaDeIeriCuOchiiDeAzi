import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/services/news.service';
import { NewsElement } from 'src/app/models/database/news.element';

@Component({
  selector: 'app-home',
  templateUrl: './app.home.component.html',
  styleUrls: ['./app.home.component.css']
})
export class HomeComponent implements OnInit {

  newsGroup: NewsElement[];

  constructor(private newsService: NewsService) {

  }

  smallerThan3(index: number) {
    if (index < 1) {
      return true;
    } else {
      return false;
    }
  }

  ngOnInit() {
    this.newsService.getNews().subscribe(
      (res: NewsElement[]) => {
        this.newsGroup = res;

        for (const it of this.newsGroup) {
          if (it.noMonth && it.noDay) {
            it.publish_date = it.publish_date.substring(0, 4);
          } else if (it.noDay) {
            it.publish_date = it.publish_date.substring(0, 7);
          } else if (it.noMonth) {
            it.publish_date = it.publish_date.substring(0, 4) + '-00-' + it.publish_date.substring(8, 10);
          }
        }
      },
      (error) => {
        if (error !== null) {
          console.log('An error happened!');

          // this.messageService.add({
          //  key: 'custom',
          //  severity: 'warn',
          //  summary: 'points.error.summary',
          // detail: 'points.error.detail'
          // });
        }
      }
    );
  }

}
