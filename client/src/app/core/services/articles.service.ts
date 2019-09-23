import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { Article, ArticleListConfig, User } from '../models';
import { map } from 'rxjs/operators';
import { UserService } from './user.service';

@Injectable()
export class ArticlesService {
  currentUser: any;
  canModify: boolean;
  constructor (
    private apiService: ApiService,
    private userService: UserService
  ) {

    this.userService.currentUser.subscribe(
      (userData: User) => {
        console.log(userData,"current user");
        
        this.currentUser = userData;

        //this.canModify = (this.currentUser.username === this.article.author[0].username);
      }
    );
  }

  query(config: ArticleListConfig): Observable<{articles: Article[], articlesCount: number}> {
    // Convert any filters over to Angular's URLSearchParams
    const params = {};

    Object.keys(config.filters)
    .forEach((key) => {
      params[key] = config.filters[key];
    });


    return this.apiService
    .get(
      '/articles/all'+ ((config.type === 'feed') ? '/feed' : ''),
      new HttpParams({ fromObject: params })
    );
  }

  get(slug): Observable<Article> {
    console.log(slug,'slug');
    
    return this.apiService.get('/articles/' + slug)
      .pipe(map(data => data.article));
  }

  destroy(slug) {
    return this.apiService.delete('/articles/' + slug);
  }

  save(article): Observable<Article> {
    // If we're updating an existing article
    console.log(article,this.currentUser);
    
    if (article.slug) {
     // article.author = this.currentUser.id?this.currentUser.id:this.currentUser._id;
     console.log(article);
     
      return this.apiService.put('/articles/' + article.slug, {article: article})
        .pipe(map(data => data.article));

    // Otherwise, create a new article
    } else {
      article.author = this.currentUser.id?this.currentUser.id:this.currentUser._id;
      return this.apiService.post('/articles/', {article: article})
        .pipe(map(data => data.article));
    }
  }

  favorite(slug): Observable<Article> {
    return this.apiService.post('/articles/' + slug + '/favorite');
  }

  unfavorite(slug): Observable<Article> {
    return this.apiService.delete('/articles/' + slug + '/favorite');
  }

}
