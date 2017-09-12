var keys = require('./keys');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var colors = require('colors');
var fs = require('fs');

var argv = process.argv.slice(2);
var searchItem = argv[1];

switch (argv[0]) {
  case 'my-tweets':
    getMyTweets();
    break;
  case 'spotify-this-song':
    spotifySong();
    break;
  case 'movie-this':
    searchMovie();
    break;
  case 'do-what-it-says':
    readRandomTxt();
    break;
  default:
}

function readRandomTxt() {
  fs.readFile('./random.txt', 'utf8', function (error, data) {
    if (error) {
      return console.log(error);
    }
    console.log(data);
  });
}

// ============ Twitter Function ==============
function getMyTweets() {

  var client = new Twitter(keys.twitterkeys);

  var client = new Twitter({
    consumer_key: keys.twitterKeys.consumer_key,
    consumer_secret: keys.twitterKeys.consumer_secret,
    access_token_key: keys.twitterKeys.access_token_key,
    access_token_secret: keys.twitterKeys.access_token_secret
  });

  var params = {screen_name: 'yam_pie'};
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    //console.log(arguments);
    if (!error) {
      for (i = 0; i < 3; i++) {
        console.log(`${tweets[i].created_at}: ${tweets[i].text}`);
      }
    }
  });
}
// ===============================================
// ============= SPOTIFY FUNCTION ================
function spotifySong() {

  var spotify = new Spotify({
    id: keys.spotify.id,
    secret: keys.spotify.secret
  });

  if (!argv[1]) {
    spotify.search({type: 'track', query: 'The Sign'})
    .then(function(data) {
      console.log(`
Artist: ${data.tracks.items[0].artists[0].name}
Name: ${data.tracks.items[0].name}
Preview Link: ${data.tracks.items[0].preview_url}
Album: ${data.tracks.items[0].album.name}
====================================
`);
    });
  }

  spotify.search({type: 'track', query: searchItem})
  .then(function(data) {
    console.log(`
Artist: ${data.tracks.items[0].artists[0].name}
Name: ${data.tracks.items[0].name}
Preview Link: ${data.tracks.items[0].preview_url}
Album: ${data.tracks.items[0].album.name}
====================================
`);
    })
    .catch(function(err) {
      console.error('Error occurred: ' + err);
  });

}
// ==================================================
// ============= SEARCH MOVIE (OMDB) FUNCTION =======
function searchMovie() {

  if (!argv[1]) {
    var queryUrl = 'http://www.omdbapi.com/?t=' + 'mr+nobody' + '&y=&plot=short&apikey=40e9cece';

    request(queryUrl, function (error, response, body) {
      if (error) {
        console.log(error);
        return;
      }

    var jBody = JSON.parse(body);
  console.log(`
Title: ${jBody.Title}
Year: ${jBody.Year}
Imdb Rating: ${jBody.imdbRating}
Rotten Tomatoes Rating: ${jBody.Ratings[1].Value}
Country Produced: ${jBody.Country}
Language: ${jBody.Language}
Plot: ${jBody.Plot}
Actors: ${jBody.Actors}
==================================
`);
    });
    return;
  }

  var queryUrl = 'http://www.omdbapi.com/?t=' + searchItem + '&y=&plot=short&apikey=40e9cece';

  request(queryUrl, function (error, response, body) {
    if (error) {
      console.log(error);
      return;
    }

  var jBody = JSON.parse(body);
  console.log(`
Title: ${jBody.Title}
Year: ${jBody.Year}
Imdb Rating: ${jBody.imdbRating}
Rotten Tomatoes Rating: ${jBody.Ratings[1].Value}
Country Produced: ${jBody.Country}
Language: ${jBody.Language}
Plot: ${jBody.Plot}
Actors: ${jBody.Actors}
==================================
`);
  });
}
