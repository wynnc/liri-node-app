require("dotenv").config();

var axios = require("axios");
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var fs = require("fs");
// axios call for band api "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
// var movie = process.argv.slice(2).join("+");

var userInput = process.argv.slice(3).join("+");

var action = process.argv[2];

function movieThis(information){
    
    if(information === ""){
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
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        });
}

function concertThis(information){
    if(information === ""){
        console.log("Please enter valid search options.")
    }
    console.log(`You are in the concertThis ${information}`)
}

function spotifyThis(information){
    spotify.search({ type: 'track', query: information }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
       
      console.log(data); })
    console.log(`You are in the spotifyThis ${information}`)
}

function doWhat(){
    // console.log(`You are in the doWhat`)
    fs.readFile("../text/random.txt", "utf8", function(error, data){
        if(error){
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
    switch(apiCall){
        case "movie-this":
            return movieThis(information);

        case "spotify-this-song":
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

