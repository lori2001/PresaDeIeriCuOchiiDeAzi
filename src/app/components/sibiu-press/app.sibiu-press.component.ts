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
    { 'val': 0, 'str': '<1900' },
    { 'val': 1900, 'str': '1900' },
    { 'val': 1910, 'str': '1910' },
    { 'val': 1920, 'str': '1920' },
    { 'val': 1930, 'str': '1930' },
    { 'val': 1940, 'str': '1940' },
    { 'val': 1950, 'str': '1950' },
    { 'val': 1960, 'str': '1960' },
    { 'val': 1970, 'str': '1970' },
    { 'val': 1980, 'str': '1980' },
    { 'val': 1990, 'str': '1990' },
    { 'val': 2000, 'str': '>2000' }
  ];

  constructor(private newsService: NewsService) {

  }

  isInYearsIndex(newsElement: NewsElement, yearsIndex: number ) {

    const pubYear = Number(newsElement.publish_date.substring(0, 4));

    if (yearsIndex >= this.years.length) {
      return true;
    } else if (pubYear > this.years[yearsIndex].val && pubYear < this.years[yearsIndex + 1].val) {
      return true;
    } else {
      return false;
    }
  }

  ngOnInit() {
    this.newsService.getNews().subscribe(
      (res: NewsElement[]) => {
        this.newsGroup = res;
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
