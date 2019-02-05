import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Song } from './song';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})

export class SongService {

  getSongs(): Observable<Song[]> {
    this.messageService.add('SongService: fetched songs');
    return this.http.get<Song[]>(this.songsUrl)
    .pipe(
      tap(_ => this.log('fetched songs')),
      catchError(this.handleError('getSongs', []))
    );
  }

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  /** GET song by id. Will 404 if id not found */
  getSong(id: number): Observable<Song> {
    const url = `${this.songsUrl}/${id}`;
    return this.http.get<Song>(url).pipe(
      tap(_ => this.log(`fetched song id=${id}`)),
      catchError(this.handleError<Song>(`getSong id=${id}`))
    );
  }

  /** PUT: update the song on the server */
  updateSong (song: Song): Observable<any> {
    return this.http.put(this.songsUrl, song, httpOptions).pipe(
      tap(_ => this.log(`updated song id=${song.id}`)),
      catchError(this.handleError<any>('updateSong'))
    );
  }

  /** POST: add a new song to the server */
  addSong (song: Song): Observable<Song> {
    return this.http.post<Song>(this.songsUrl, song, httpOptions).pipe(
      tap((newSong: Song) => this.log(`added song w/ id=${newSong.id}`)),
      catchError(this.handleError<Song>('addSong'))
    );
  }

  /** DELETE: delete the song from the server */
  deleteSong (song: Song | number): Observable<Song> {
    const id = typeof song === 'number' ? song : song.id;
    const url = `${this.songsUrl}/${id}`;

    return this.http.delete<Song>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted song id=${id}`)),
      catchError(this.handleError<Song>('deleteSong'))
    );
  }

  private log(message: string) {
    this.messageService.add(`SongService: ${message}`);
  }

  private songsUrl = 'api/songs';

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
