import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TweetService } from '../tweet.service';

@Component({
  selector: 'app-searches',
  templateUrl: './searches.component.html',
  styleUrls: ['./searches.component.css']
})
export class SearchesComponent implements OnInit {
  searches = [];
  search = {};
  data = {}

  constructor(private tweetService: TweetService) { }

  ngOnInit() {
    this.tweetService.getSearches().subscribe(
      (searches) => this.searches = searches,
      (err) => this.handleError(err)
    );
  }

  createSearch(query, quantity) {
    if (!query.value || query.value.length === 0) {
      alert("Please enter a search term.");
      return;
    }

    let inputQuantity = parseInt(quantity.value);
    if (!inputQuantity || inputQuantity < 1) {
      alert("Please enter a valid quantity (minimum: 1).")
      return;
    }

    this.tweetService.createSearch({query: query.value, quantity: quantity.value}).subscribe(
      (data) => window.location.reload(),
      (err) => this.handleError(err)
    );

    query.value = '';
    quantity.value = '';
  }

  deleteSearch(name) {
    this.tweetService.deleteSearch(name).subscribe(
      (searches) => console.log("Dropped " + name),
      (err) => this.handleError(err)
    );
  }

  handleError(error: any) {
    console.error(error);
    let errorMessage = error.text();
    alert(errorMessage);
  }

}
