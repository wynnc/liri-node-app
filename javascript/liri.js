require("dotenv").config();

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
    console.log(`You are in the movieThis ${information}`)
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
        console.log(data);
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

