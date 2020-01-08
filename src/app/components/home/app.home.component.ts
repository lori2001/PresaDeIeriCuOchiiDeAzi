import { Component, HostListener, OnInit } from '@angular/core';
import { NewsService } from 'src/app/services/news.service';
import { NewsElement } from 'src/app/models/database/news.element';

@Component({
  selector: 'app-home',
  templateUrl: './app.home.component.html',
  styleUrls: ['./app.home.component.css']
})
export class HomeComponent implements OnInit {

  filteredNewsGroup: NewsElement[] = [];
  mode = 'desktop';

  team: string[] = ['ambrus-attila',
                    'mihaela-grancea',
                    'molnar-stefania',
                    'cornel-maria',
                    'molnar-csaba',
                    'konya-ecaterina'];

  constructor(private newsService: NewsService) {
    this.checkMode();
    console.log(this.mode);
  }

    /*owl carousel options from https://owlcarousel2.github.io/OwlCarousel2/docs/api-options.html */

    public newsSliderOPT: any = {
      startPosition: 1,
      margin: 10,
      dots: false,
      autoplay: false,
      autoplayTimeout: 4000,
      autoplaySpeed: 1000,
      loop: true,
      autoplayHoverPause: true,
      items: 1
    };

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

  @HostListener('window:resize', ['$event'])
  checkMode() {
    if (window.innerWidth > 1200) {
      this.mode = 'desktop'; // enables desktop mode
    } else if (window.innerWidth > 768) {
      this.mode = 'tablet'; // enables tablet mode
    } else {
      this.mode = 'mobile'; // enables mobile mode
    }
  }

}
