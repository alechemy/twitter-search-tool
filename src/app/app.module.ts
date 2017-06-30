import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { SearchesComponent } from './searches/searches.component';
import { SearchDetailsComponent } from './search-details/search-details.component';

//Routing
import { routing } from './app.routes';

import { TweetService } from './tweet.service';


@NgModule({
  declarations: [
    AppComponent,
    SearchesComponent,
    SearchDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [TweetService],
  bootstrap: [AppComponent]
})
export class AppModule { }
