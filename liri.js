const result  = require('dotenv').config();
const keys    = require('./keys');
const Twitter = require('twitter');
const Spotify = require('node-spotify-api');
const request = require('request');
const fs      = require('fs');
const main    = require('./main.js');

let client  = new Twitter(keys.twitter);
let spotify = new Spotify(keys.spotify);

// **************************************************************************

module.exports.liri = {
    // my twitter: 'PracticeNode',
    connected: function () {
        console.log('Liri is connected!');
    },
    mainSwitch: (command, input) => {
        switch (command) {
            case 'get-tweets':
                exports.liri.twitterGet(exports.liri.twitterScreenName, exports.liri.twitterLog);
                break;
            case 'spotify-this-song':
                exports.liri.spotifyThis(input);
                break;
            case 'movie-this':
                exports.liri.requestMovieTitle(input);
                break;
            case 'do-what-it-says':
                exports.liri.doWhatItSays('./random.txt');
                break;
            default:
            exports.liri.appendLog(`Error! Not an accepted command: '${command}'`);
        }
    },
    twitterGet: (screenName, callback) => {
        client.get('statuses/user_timeline', { screen_name: screenName }, callback);
    },
    twitterLog: (err, tweets, res) => {
        if (!err) {
            tweets.forEach(function (tweet) {
                exports.liri.appendLog(`${tweet.text}\nSHARED ON: ${tweet.created_at}`);
            })
            main.promptUser();
        } else {
            // throw err
            console.log(err.status);
        }
    },
    spotifyThis: (trackName) => {
        spotify.search({ type: 'track', query: trackName, limit: 1 }, function (err, data) {
            if (err) {
                exports.liri.appendLog('Error occurred: ' + err);
                return
            }
            exports.liri.appendLog(`
                Artist: "${data.tracks.items[0].artists[0].name}"\n
                Song: "${data.tracks.items[0].name}"\n
                Album: "${data.tracks.items[0].album.name}"\n
                Preview: "${data.tracks.items[0].external_urls.spotify}"
            `);
            main.promptUser();

        });
    },
    requestMovieTitle: (movieTitle) => {
        let baseURL = 'http://www.omdbapi.com/?apikey=trilogy&t='
        let queryURL = baseURL.concat(movieTitle);
        exports.liri.appendLog(queryURL);
        
        request(queryURL, function (err, res, body) {
            if (!(err)) {
                if (body.includes('Movie not found!')) {
                    exports.liri.appendLog('Error! Movie not found. Enter another movie title.');
                    main.promptUser();
                    return;
                }
                let data = JSON.parse(body);
                // appendLog(data)
                exports.liri.appendLog(`
                    Title: ${data.Title}\n
                    Release Year: ${data.Year}\n
                    IMDB: ${data.imdbRating}\n
                    Rotten Tomatoes: ${data.Ratings[1].Value}\n
                    Country: ${data.Country}\n
                    Language: ${data.Language}\n
                    Plot: ${data.Plot}\n
                    Actors: ${data.Actors}
                `);
                main.promptUser();
                return
            }
            exports.liri.appendLog(err)
        });
    },
    doWhatItSays: (fileName) => {
        fs.readFile(fileName, 'utf-8', function (err, data) {
            if (!err) {
                let fileString = JSON.stringify(data);
                if (fileString.includes(',')) {
                    let dataArr = fileString.split(',');
                    let commandAlt = dataArr[0].trim().slice(1);
                    let sliceOne = dataArr[1].trim().slice(2);
                    let sliceTwo = sliceOne.slice(0, sliceOne.length - 3);
                    let inputAlt = sliceTwo;
                    exports.liri.appendLog(`
                        From file: ${fileName}\n
                        Command: ${commandAlt}\n
                        Input: ${inputAlt}
                    `);
                    exports.liri.mainSwitch(commandAlt, inputAlt);
                    return
                }
                let commandWithQuotations = fileString.trim()
                let sliceOne = commandWithQuotations.slice(1);
                let sliceTwo = sliceOne.slice(0, sliceOne.length - 1);
                let commandAlt = sliceTwo;
                exports.liri.mainSwitch(commandAlt)
            }
        });
    },
    appendLog:(...inputs) => {

        for (input of inputs) { // append log
            fs.appendFile('./log.txt', '\n' + input, function (err) {
                if (err) throw err;
            })
            console.log(input); // show log in console
        }
    }
}
