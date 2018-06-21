import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private url = '/jsonplaceholder/comments';

  constructor(private messageService: MessageService, private http: HttpClient) {
  }

  getComments(): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.url)
      .pipe(
        catchError(error => {
          this.messageService.error(`getComments() ${error.message}`);
          return of(null);
        })
      );
  }

}
