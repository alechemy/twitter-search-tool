import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TweetService } from '../tweet.service';

@Component({
  selector: 'app-search-details',
  templateUrl: './search-details.component.html',
  styleUrls: ['./search-details.component.css']
})
export class SearchDetailsComponent implements OnInit {
  name: any;
  db = {};
  sub: any;

  constructor(private route: ActivatedRoute,
              private tweetService: TweetService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.name = params['name'];
      this.tweetService.getSearch(params['name']).subscribe(
        (data) => this.db = data,
        (err) => this.handleError(err)
      );
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  handleError(error: any) {
    console.error(error);
    let errorMessage = error.text();
    alert(errorMessage);
  }

}
