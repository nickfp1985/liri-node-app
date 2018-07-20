const result = require('dotenv').config();
const keys = require('./keys');
const request = require('request');
const fs = require('fs');

const Twitter = require('twitter');
// const Spotify = require('spotify');

const command = process.argv[2];
const input = process.argv[3];

// let spotify = new Spotify(keys.spotify);
let client = new Twitter(keys.twitter);

function findTweets() {
  let params = {screen_name: 'PracticeNode'};

  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
      console.log(tweets);
    }
  });
}

function findSpotify() {
  
}

function findMovie() {

}

switch (command) {
  case 'my-tweets':
    findTweets();
    break;
  case 'spotify-this-song':
    findSpotify();
    break;
  case 'movie-this':
    findMovie();
    break;
  case 'do-what-it-says':

    break;
  default:
    
    break;
}