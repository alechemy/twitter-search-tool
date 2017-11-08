Authors: Alec Custer and [Jack Taylor](https://github.com/jtaylorz)

How to Run:
Step 0a) Install Node
Step 0b) Install mongoDB

Step 1) ```cd``` into the project directory

Step 2) Run ```npm install``` to install all dependencies required for running our project, such as Mongoose and Angular 2. This will take a few seconds.

Step 3) Open server/twitterKeys.js and paste in your own ```consumer_key```, ```consumer_secret```, and ```bearer_token``` (app level access).

Step 4) Enter ```npm run build``` in the Terminal shell from the root project directory to run the ```server.js``` file and compile the Angular 2 front-end application.

Step 5) Finally, navigate to ```localhost:3000``` in a browser of your choice to begin gathering tweets.

Step 6) (Optional) Our front-end application provides the option to view the first one hundred tweets for a search in the browser. To interact with the entire database(s), we recommend using a MongoDB GUI such as Robomongo.
