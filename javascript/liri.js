require("dotenv").config();

var axios = require("axios");
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var fs = require("fs");
var divider = "\n------------------------------------------------------------\n\n";
var logInfo = "";

// axios call for band api "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
// var movie = process.argv.slice(2).join("+");

var userInput = process.argv.slice(3).join("+");
console.log(userInput);

var action = process.argv[2];

function movieThis(information) {

    if (information === "") {
        information = "Mr. Nobody";
        // console.log()
    }
    var queryUrl = "http://www.omdbapi.com/?t=" + information + "&y=&plot=short&apikey=trilogy";
    // console.log(`You are in the movieThis ${information}`)

    axios.get(queryUrl).then(
        function (response) {
            var data = response.data
            // * Title of the movie.
            // * Year the movie came out.
            // * IMDB Rating of the movie.
            // * Rotten Tomatoes Rating of the movie.
            // * Country where the movie was produced.
            // * Language of the movie.
            // * Plot of the movie.
            // * Actors in the movie.
            // console.log(response.data);
            console.log(`Movie Title: ${data.Title}\n Year Released: ${data.Year}\n IMDB Rating: ${data.imdbRating}\n Rotten Tomatoes Rating: ${data.Ratings[1].Value}\n Country: ${data.Country}\n Language: ${data.Language}\n Plot: ${data.Plot}\n Actors: ${data.Actors}`)

        })
        .catch(function (error) {
            console.log(error);
        })
        .then(function () {
            // always executed
        });

};

function concertThis(information) {
    //     node liri.js concert-this <artist/band name here>

    // This will search the Bands in Town Artist Events API ("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp") for an artist and render the following information about each event to the terminal:

    // Name of the venue

    // Venue location

    // Date of the Event (use moment to format this as "MM/DD/YYYY")

    if (information === "") {
        console.log("Please enter valid search options.")
    }
    // console.log(`You are in the concertThis ${information}`)
    var queryUrl = "https://rest.bandsintown.com/artists/" + information + "/events?app_id=codingbootcamp"
    axios.get(queryUrl).then(
        function (response) {
            var data = response.data
            // console.log(data);
            for (var i = 0; i < data.length; i++) {
                console.log(`Venue: ${data[i].venue.name}\n City: ${data[i].venue.city}\n Date: ${data[i].datetime}`)

            }
        })
        .catch(function (error) {
            console.log(error);
        })
        .then(function () {
            // always executed
        });

};


function spotifyThis(information) {
    //     This will show the following information about the song in your terminal/bash window

    // Artist(s)

    // The song's name

    // A preview link of the song from Spotify

    // The album that the song is from

    // If no song is provided then your program will default to "The Sign" by Ace of Base.
    if (information === "") {
        information = "the sign";
    }

    spotify.search({ type: 'track', query: information }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        // console.log(data.tracks.items[0].artists[0].name);

        for (var i = 0; i < 1; i++) {
            var info = data.tracks;

            infoLog = `Artist: ${info.items[i].artists[i].name}\n\nSong Title: ${info.items[i].name}\n\nSpotify Preview Link: ${info.items[i].preview_url}\n\nSong Album: ${info.items[i].album.name}`

            console.log(infoLog);

        }
    })
}

function doWhat() {
    // console.log(`You are in the doWhat`)
    fs.readFile("../text/random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        // console.log(data);
        var dataArr = data.split(",");
        var action = dataArr[0];
        var userInput = dataArr[1];
        switchAction(action, userInput);
    })
}

function switchAction(apiCall, information) {
    switch (apiCall) {
        case "movie-this":
            return movieThis(information);

        case "spotify-this-song":
            // console.log(information);
            var information = information.replace("+", " ");
            // console.log(information);
            return spotifyThis(information);

        case "concert-this":
            return concertThis(information);

        case "do-what-it-says":
            return doWhat();

        default:
            return console.log("Please enter valid command.")
    }
}

switchAction(action, userInput);

function logFile(logInfo){
fs.appendFile("log.txt", actorData + divider, function(err) {
    if (err) throw err;
    console.log(actorData);
  })
}