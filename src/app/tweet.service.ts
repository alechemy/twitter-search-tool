import { Injectable } from '@angular/core';
import { Tweet } from './tweet';
import { Search } from './search';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class TweetService {
  private tweetsUrl = '/api/tweets';
  private searchesUrl = '/api/searches';

  constructor(private http: Http) {}

  //Functions for making calls to our API:
  createSearch(newSearch) {
    return this.http.post(this.tweetsUrl, newSearch)
      .map(res => res.json());
  }

  getSearches() {
    return this.http.get(this.searchesUrl)
      .map(res => res.json());
  }

  getSearch(search) {
    return this.http.get(this.searchesUrl + '/' + encodeURIComponent(search))
      .map(res => res.json());
  }

  deleteSearch(search) {
    return this.http.delete(this.searchesUrl + '/' + encodeURIComponent(search))
      .map(res => res.json());
  }

}
