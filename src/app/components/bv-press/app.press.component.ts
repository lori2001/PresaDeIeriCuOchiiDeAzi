import { Component, OnInit } from '@angular/core';
import { NewsElement } from 'src/app/models/database/news.element';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-press',
  templateUrl: './app.press.component.html',
  styleUrls: ['./app.press.component.css']
})
export class PressComponent implements OnInit  {

  categories: any[] = [];
  selectedCategory: string;
  languages: any[] = [];
  selectedLanguage: string;
  names: any[] = [];
  selectedName: string;
  selectionStage = 1;

  newsGroup: NewsElement[];
  filteredNewsGroup: NewsElement[] = []; // used for both news and newsNames

  constructor(private newsService: NewsService) {
    this.selectionStage = 0;
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

        // gets all possible categories
        let addedCategories: string[] = [' ']; // avoids adding category button 1000 times
        for (const item of this.newsGroup) {
          let shouldPush = true;

          for (const element of addedCategories) {
            if (element === item.category) {
              shouldPush = false;
            }
          }

          if (shouldPush === true) {
            addedCategories.push(item.category);
            this.categories.push(item.category);
          }
        }
        console.log(this.categories);
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

  // STAGE 0
  filterCategory(category: string) {
    this.selectionStage = 1; // next selection stage(changes layout)
    this.filteredNewsGroup = []; // clear filteredGroup
    this.selectedCategory = category; // sets filter

    let addedLanguages: string[] = [' ']; // avoids adding language button 1000 times
    for (const item of this.newsGroup) {
      if (item.category === this.selectedCategory) {

        let shouldPush = true;

        for (const element of addedLanguages) {
          if (element === item.language) {
            shouldPush = false;
          }
        }

        if (shouldPush === true) {
          addedLanguages.push(item.language);
          this.languages.push(item.language);
        }
      }
    }
  }

  // STAGE I
  filterLanguage(language: string) {
    this.selectionStage = 2; // next selection stage(changes layout)
    this.filteredNewsGroup = []; // clear filteredGroup
    this.selectedLanguage = language; // sets filter

    let addedNewsNames: string[] = [' ']; // avoids adding a news page 1000 times
    for (const item of this.newsGroup) {
      if (item.language === this.selectedLanguage && item.category === this.selectedCategory) {

        let shouldPush = true;

        for (const element of addedNewsNames) {
          if (element.indexOf(item.name) === 0) {
            shouldPush = false;
          }
        }

        if (shouldPush === true) {
          addedNewsNames.push(item.name);
          this.filteredNewsGroup.push(item);
        }
      }
    }
  }

  // STAGE II (stage III is the link)
  filterPublishes(name: string) {
    this.selectionStage = 3; // next selection stage
    this.filteredNewsGroup = []; // clear filteredGroup
    this.selectedName = name; // sets filter

    for (const item of this.newsGroup) {
      if (item.name === this.selectedName) {
          this.filteredNewsGroup.push(item);
      }
    }
  }

}
