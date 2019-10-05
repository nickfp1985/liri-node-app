const app = require('./liri');
const inquirer = require('inquirer');

app.liri.connected(); // checks liri connection

runLiri();

const runLiri = () => {
    // read the liri command and activate the corresponding functions
    inquirer.prompt([
        {
            message: "Choose a Liri command:",
            type: "list",
            name: "command",
            choices: ['get-tweets', 'spotify-this-song', 'movie-this', 'do-what-it-says']
        }
    ]).then((answers) => {
        let command = answers.command; // user input
        switch (command) {
            case 'get-tweets':
                twitterReq();
                break;
            case 'spotify-this-song':
                spotifyReq();
                break;
            case 'movie-this':
                omdbReq();
                break;
            case 'do-what-it-says':
                app.liri.mainSwitch('do-what-it-says', '-');
                break;
            default:
        }
    });
}

// **************************************************************************

const omdbReq = () => {
    inquirer.prompt([
        {
            message: "Movie:",
            type: "input",
            name: "movie"
        }
    ]).then(function (answer) {
        if (answer.movie === undefined || answer.movie === null || answer.movie.length === 0) {
            answer.movie = 'jaws';  // with no input, it will default to jaws imdb
        }
        app.liri.mainSwitch('movie-this', answer.movie);
    })
}

const spotifyReq = () => {
    inquirer.prompt([
        {
            message: "Song:",
            type: "input",
            name: "track"
        }
    ]).then(function (answer) {
        if (answer.track === undefined || answer.track === null || answer.track.length === 0) {
            answer.track = 'rock + roll'; // with no input, it will default to this song by EDEN
        }
        app.liri.mainSwitch('spotify-this-song', answer.track);
    })
}

const twitterReq = () => {
    inquirer.prompt([
        {
            message: "Twitter Name:",
            type: "input",
            name: "twitterScreenName"
        }
    ]).then(function (answer) {
        if (answer.twitterScreenName === undefined || answer.twitterScreenName === null || answer.twitterScreenName.length === 0) {
            answer.twitterScreenName = 'Twitter'; // if nothing is entered, default to this account
        }
        app.liri.twitterScreenName = answer.twitterScreenName;
        app.liri.mainSwitch('get-tweets', '-');
    })
}

module.exports.promptUser = function () {
    inquirer.prompt([
        {
            message: "Try another Liri command?",
            name: "restart",
            type: "confirm"
        }
    ]).then(function (answer) {
        (answer.restart) ? runLiri() : console.log('GOODBYE!');
    })
}
