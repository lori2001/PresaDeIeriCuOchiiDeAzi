import { Component, OnInit } from '@angular/core';
import { NewsElement } from 'src/app/models/database/news.element';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-sibiu-press',
  templateUrl: './app.sibiu-press.component.html',
  styleUrls: ['./app.sibiu-press.component.css']
})
export class SibiuPressComponent implements OnInit {

  newsGroup: NewsElement[];

  years: { val: number, str: string }[] = [
    { 'val': 1860, 'str': '1860-1870' },
    { 'val': 1871, 'str': '1871-1880' },
    { 'val': 1881, 'str': '1881-1890' },
    { 'val': 1891, 'str': '1891-1900' },
    { 'val': 1901, 'str': '1901-1919' }
  ];

  constructor(private newsService: NewsService) {

  }

  isInYearsIndex(newsElement: NewsElement, yearsIndex: number ) {
    const pubYear = Number(newsElement.publish_date.substring(0, 4));

    if (yearsIndex + 1 >= this.years.length) {
      if (pubYear > this.years[yearsIndex].val) {
        return true;
      } else {
        return false;
      }
    } else if (pubYear >= this.years[yearsIndex].val && pubYear < this.years[yearsIndex + 1].val) {
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

          /*this.messageService.add({
            key: 'custom',
            severity: 'warn',
            summary: 'points.error.summary',
            detail: 'points.error.detail'
          });*/
        }
      }
    );
  }

}
