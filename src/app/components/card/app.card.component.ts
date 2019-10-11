import { Input } from '@angular/core';
import { Component } from '@angular/core';
import { NewsElement } from 'src/app/models/database/news.element';

@Component({
  selector: 'app-card',
  templateUrl: './app.card.component.html',
  styleUrls: ['./app.card.component.css']
})
export class CardComponent {
    @Input() newsElement: NewsElement = {
      id: 0 ,
      name: 'Name',
      description: 'No Description',
      img: '../../../assets/images/placeholder.jpg',
      href: '../../../assets/images/placeholder.jpg',
      category: 'No Category',
      publish_date: '2019.10.11'
    };
}

