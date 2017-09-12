var twitter = require('twitter');
var keys = require('keys');
var fs = require('fs');

var commands = process.argv;

// Runs spotify (random.txt) test
var spotify = function () {
  console.log('hello');
  fs.readFile('random.txt', 'utf8', function(err, data) {
  if (err) {
    console.log(err);
  } else {
    console.log(data);
  }
})
}

spotify();



// twitter API call
var params = {screen_name: 'yam_pie'};
// client.get('status/user_timeline', params, function (error, tweets, response) {
//   if (!error) {
//     console.log(tweets);
//   }
// })


// var test1 = process.argv[2]; // process.argv is an arrary
// var test2 = process.argv[3];
// var test3 = process.argv[4];
// var test4 + process.argv[5];
//
// console.log(test1);
