webpackJsonp([1,4],{

/***/ 150:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(21)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 151:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(21)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 152:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(21)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 154:
/***/ (function(module, exports) {

module.exports = "<router-outlet></router-outlet>\n"

/***/ }),

/***/ 155:
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n  <div class=\"row\">\n    <button type=\"button\" class=\"btn btn-primary\" [routerLink]=\"['/searches']\">Back to all searches</button>\n  </div>\n\n  <h1>Search: {{name}}</h1>\n  \n  <div class=\"card card-block\">\n    <h4 class=\"card-title\">Search Details:</h4>\n    <h5>Min ID: {{db.minID}}</h5>\n    <h5>Max ID: {{db.maxID}}</h5>\n    <h5>Contains: {{db.count}} tweets</h5>\n  </div>\n\n  <div class=\"col-xs-12\" style=\"height:30px;\"></div>\n\n  <h5>Tweets (limit 100)</h5>\n  <div class=\"row\" *ngFor=\"let tweet of db.tweets\">\n    <div class=\"card card-block\">\n      <h4 class=\"card-title\">{{ tweet.author }}</h4>\n      <p>{{ tweet._id }}</p>\n      <p>{{ tweet.content }}</p>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ 156:
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n  <div class=\"row\">\n    <div class=\"col-xs-12\" style=\"height:30px;\"></div>\n    <h1>Twitter Search Tool</h1>\n    <p>Note: Before using this tool, you must set your API keys in the 'server/twitterKeys.js' file.</p>\n    <div class=\"card card-block\">\n      <h4 class=\"card-title\">New search</h4>\n      <form>\n        <div class=\"form-group\">\n          <label for=\"query-name\">Query</label>\n          <input class=\"form-control\" autocomplete=\"off\" name=\"query-name\" #newquery placeholder=\"#MongoDB\"/>\n        </div>\n\n        <div class=\"form-group\">\n          <label for=\"quantity\">Quantity</label>\n          <input class=\"form-control\" type=\"number\" min=\"1\" autocomplete=\"off\" name=\"quantity\" #newquantity placeholder=\"2000\"/>\n        </div>\n\n        <button class=\"btn btn-primary\" (click)=\"createSearch(newquery, newquantity)\">Submit</button>\n      </form>\n    </div>\n  </div>\n  <div class=\"col-xs-12\" style=\"height:30px;\"></div>\n  <h4 class=\"card-title\">Previous searches</h4>\n  <div class=\"row\" *ngFor=\"let search of searches\">\n    <div class=\"card card-block\">\n      <h4 class=\"card-title\">{{ search.name }}</h4>\n      <a href=\"#\" class=\"btn btn-primary\" [routerLink]=\"['/search', search.name]\">Connect</a>\n      <a href=\"#\" class=\"btn btn-danger\" (click)=\"deleteSearch(search.name)\">Delete</a>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ 188:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(87);


/***/ }),

/***/ 33:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TweetService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var TweetService = (function () {
    function TweetService(http) {
        this.http = http;
        this.tweetsUrl = '/api/tweets';
        this.searchesUrl = '/api/searches';
    }
    //Functions for making calls to our API:
    TweetService.prototype.createSearch = function (newSearch) {
        return this.http.post(this.tweetsUrl, newSearch)
            .map(function (res) { return res.json(); });
    };
    TweetService.prototype.getSearches = function () {
        return this.http.get(this.searchesUrl)
            .map(function (res) { return res.json(); });
    };
    TweetService.prototype.getSearch = function (search) {
        return this.http.get(this.searchesUrl + '/' + encodeURIComponent(search))
            .map(function (res) { return res.json(); });
    };
    TweetService.prototype.deleteSearch = function (search) {
        return this.http.delete(this.searchesUrl + '/' + encodeURIComponent(search))
            .map(function (res) { return res.json(); });
    };
    return TweetService;
}());
TweetService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object])
], TweetService);

var _a;
//# sourceMappingURL=tweet.service.js.map

/***/ }),

/***/ 61:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tweet_service__ = __webpack_require__(33);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchDetailsComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SearchDetailsComponent = (function () {
    function SearchDetailsComponent(route, tweetService) {
        this.route = route;
        this.tweetService = tweetService;
        this.db = {};
    }
    SearchDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            _this.name = params['name'];
            _this.tweetService.getSearch(params['name']).subscribe(function (data) { return _this.db = data; }, function (err) { return _this.handleError(err); });
        });
    };
    SearchDetailsComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    SearchDetailsComponent.prototype.handleError = function (error) {
        console.error(error);
        var errorMessage = error.text();
        alert(errorMessage);
    };
    return SearchDetailsComponent;
}());
SearchDetailsComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* Component */])({
        selector: 'app-search-details',
        template: __webpack_require__(155),
        styles: [__webpack_require__(151)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* ActivatedRoute */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__tweet_service__["a" /* TweetService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__tweet_service__["a" /* TweetService */]) === "function" && _b || Object])
], SearchDetailsComponent);

var _a, _b;
//# sourceMappingURL=search-details.component.js.map

/***/ }),

/***/ 62:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tweet_service__ = __webpack_require__(33);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchesComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SearchesComponent = (function () {
    function SearchesComponent(tweetService) {
        this.tweetService = tweetService;
        this.searches = [];
        this.search = {};
        this.data = {};
    }
    SearchesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.tweetService.getSearches().subscribe(function (searches) { return _this.searches = searches; }, function (err) { return _this.handleError(err); });
    };
    SearchesComponent.prototype.createSearch = function (query, quantity) {
        var _this = this;
        if (!query.value || query.value.length === 0) {
            alert("Please enter a search term.");
            return;
        }
        var inputQuantity = parseInt(quantity.value);
        if (!inputQuantity || inputQuantity < 1) {
            alert("Please enter a valid quantity (minimum: 1).");
            return;
        }
        this.tweetService.createSearch({ query: query.value, quantity: quantity.value }).subscribe(function (data) { return window.location.reload(); }, function (err) { return _this.handleError(err); });
        query.value = '';
        quantity.value = '';
    };
    SearchesComponent.prototype.deleteSearch = function (name) {
        var _this = this;
        this.tweetService.deleteSearch(name).subscribe(function (searches) { return console.log("Dropped " + name); }, function (err) { return _this.handleError(err); });
    };
    SearchesComponent.prototype.handleError = function (error) {
        console.error(error);
        var errorMessage = error.text();
        alert(errorMessage);
    };
    return SearchesComponent;
}());
SearchesComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* Component */])({
        selector: 'app-searches',
        template: __webpack_require__(156),
        styles: [__webpack_require__(152)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__tweet_service__["a" /* TweetService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__tweet_service__["a" /* TweetService */]) === "function" && _a || Object])
], SearchesComponent);

var _a;
//# sourceMappingURL=searches.component.js.map

/***/ }),

/***/ 86:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 86;


/***/ }),

/***/ 87:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(96);




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 93:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(4);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = (function () {
    function AppComponent() {
    }
    return AppComponent;
}());
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* Component */])({
        selector: 'app-root',
        template: __webpack_require__(154),
        styles: [__webpack_require__(150)]
    })
], AppComponent);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 94:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__searches_searches_component__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__search_details_search_details_component__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_routes__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__tweet_service__ = __webpack_require__(33);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







//Routing


var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["b" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_5__searches_searches_component__["a" /* SearchesComponent */],
            __WEBPACK_IMPORTED_MODULE_6__search_details_search_details_component__["a" /* SearchDetailsComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_7__app_routes__["a" /* routing */]
        ],
        providers: [__WEBPACK_IMPORTED_MODULE_8__tweet_service__["a" /* TweetService */]],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 95:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__searches_searches_component__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__search_details_search_details_component__ = __webpack_require__(61);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return routing; });



var routes = [
    {
        path: 'searches',
        component: __WEBPACK_IMPORTED_MODULE_1__searches_searches_component__["a" /* SearchesComponent */]
    },
    {
        path: 'search/:name',
        component: __WEBPACK_IMPORTED_MODULE_2__search_details_search_details_component__["a" /* SearchDetailsComponent */]
    },
    {
        path: '',
        redirectTo: '/searches',
        pathMatch: 'full'
    }
];
var routing = __WEBPACK_IMPORTED_MODULE_0__angular_router__["a" /* RouterModule */].forRoot(routes);
//# sourceMappingURL=app.routes.js.map

/***/ }),

/***/ 96:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ })

},[188]);
//# sourceMappingURL=main.bundle.js.map