import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { NewsElement } from '../models/database/news.element';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  baseUrl = 'api';
  news: NewsElement[];

constructor(private http: HttpClient) { }

  getNews(): Observable<NewsElement[]> {
    return this.http.get(`${this.baseUrl}/getNews.php`).pipe(
      map((res) => {
        this.news = res['data'];
        return this.news;
    }),
    catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    // return an observable with a user friendly message
    return throwError('Error! Something went wrong!');
  }
}
