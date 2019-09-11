import { Input } from '@angular/core';
import { Component } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './app.card.component.html',
  styleUrls: ['./app.card.component.css']
})
export class CardComponent {
    @Input() image = 'https://via.placeholder.com/500x325';
}

