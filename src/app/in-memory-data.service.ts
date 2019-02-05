import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Song } from './song';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const songs = [
      { id: 1, title: 'Generic Love Song', writer: 'S.M.O.D.', bpm: 100, notes: 'THE Song', lyrics: 'This one time...'},
      { id: 6, title: 'Someone Like Me', writer: 'Adele', bpm: 85, notes: "it's a song.", lyrics: 'I heard...'},
      { id: 7, title: "I'm Yours", writer: 'Jason Mraz', bpm: 95, notes: "it's a fun song.", lyrics: 'Well you...'},
      { id: 8, title: 'When I Was Your Man', writer: 'Bruno Mars', bpm: 90, notes: "it's a cool song.", lyrics: 'When I was your man...'},
      { id: 9, title: "Can't Help Falling In Love", writer: 'Elvis Presley', bpm: 80, notes: "it's an old song.", lyrics: 'Wise men say...'}
    ];
    return {songs};
  }

  genId(songs: Song[]): number {
    return songs.length > 0 ? Math.max(...songs.map(song => song.id)) + 1 : 11;
  }
}
