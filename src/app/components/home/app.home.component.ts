import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/services/news.service';
import { NewsElement } from 'src/app/models/database/news.element';

@Component({
  selector: 'app-home',
  templateUrl: './app.home.component.html',
  styleUrls: ['./app.home.component.css']
})
export class HomeComponent implements OnInit {

  filteredNewsGroup: NewsElement[] = [];

  team: string[] = ['ambrus-attila',
                    'mihaela-grancea',
                    'molnar-stefania',
                    'cornel-maria',
                    'molnar-csaba',
                    'konya-ecaterina'];

  constructor(private newsService: NewsService) {

  }

    /*owl carousel options from https://owlcarousel2.github.io/OwlCarousel2/docs/api-options.html */
    public teamSliderOPT: any = {
      dots: false,
      autoplay: true,
      autoplayTimeout: 3000,
      autoplaySpeed: 1000,
      rewind: true,
      autoplayHoverPause: true,
      items: 4,
      responsiveClass: true,
      responsive: {
          0: {
              items: 1,
              dots: false
          },
          576: {
              items: 3
          },
          768: {
              items: 4
          }
      }
    };

    public newsSliderOPT: any = {
      startPosition: 6,
      margin: 10,
      dots: false,
      autoplay: true,
      autoplayTimeout: 4000,
      autoplaySpeed: 1000,
      loop: true,
      autoplayHoverPause: true,
      items: 1
    };

  ngOnInit() {
    this.newsService.getNews().subscribe(
      (res: NewsElement[]) => {
        const newsGroup = res;
        const usedNames: any[] = [];

        for (const it of newsGroup) {
          let shouldPush = true;

          for (const elem of usedNames) {
            if (elem === it.name) {
              shouldPush = false;
            }
          }

          if (shouldPush) {
            if (it.noMonth && it.noDay) {
              it.publish_date = it.publish_date.substring(0, 4);
            } else if (it.noDay) {
              it.publish_date = it.publish_date.substring(0, 7);
            } else if (it.noMonth) {
              it.publish_date = it.publish_date.substring(0, 4) + '-00-' + it.publish_date.substring(8, 10);
            }

            usedNames.push(it.name);
            this.filteredNewsGroup.push(it);
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
