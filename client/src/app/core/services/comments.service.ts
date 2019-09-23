import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { Comment, User } from '../models';
import { map } from 'rxjs/operators';
import { UserService } from './user.service';


@Injectable()
export class CommentsService {
  currentUser: User;
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

  add(slug, payload,user): Observable<Comment> {
    console.log(user,'gcdfdrfdgdgdgdggdgdgdgx');
    
    return this.apiService
    .post(
      `/articles/${slug}/comments`,
      { comment: { body: payload,author:user.id?user.id:user._id} }
    ).pipe(map(data => data.comment));
  }

  getAll(slug): Observable<Comment[]> {
    return this.apiService.get(`/articles/${slug}/comments`)
      .pipe(map((data) => data.comment));
  }

  destroy(commentId, articleSlug) {
    return this.apiService
           .delete(`/articles/${articleSlug}/comments/${commentId}`);
  }

}
