# LIRI-NODE-APP
LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a _Language_ Interpretation and Recognition Interface. LIRI is a command line node app that takes in parameters and returns relevant data.

## HOW-T0:
* `CLONE` or `DOWNLOAD ZIP` to local computer
* cd into the root folder of this app
* `RUN` command `'npm install'` to install packages for this app
* Create an `.env` file and replace the following with your own spotify and twitter api keys:

    ```
    # Spotify API keys

    SPOTIFY_ID=paste-key-here
    SPOTIFY_SECRET=paste-key-here

    # Twitter API keys

    TWITTER_CONSUMER_KEY=paste-key-here
    TWITTER_CONSUMER_SECRET=paste-key-here
    TWITTER_ACCESS_TOKEN_KEY=paste-key-here
    TWITTER_ACCESS_TOKEN_SECRET=paste-key-here

    ```
* `RUN` file `main.js` in your terminal/bash window ( `node main.js` )
* `Liri` will give four commands to choose from. Use the `ARROW KEYS` to move between the options and press the `ENTER` key to select one.

##### (a) `'get-tweets'`

   * Liri will ask for a twitter screen name.
   
     * The account's 20 most recent tweets will show in the console, with timestamps.

   * If no twitter name is provided, the search is defaulted to `@Twitter`

##### (b) `'spotify-this-song'`

   * Liri will ask for a song name.

   * The following info will be shown in the console:

      ```
       * Artist(s)
       * Song Name
       * A link to Spotify's song preview clip
       * Album Name

      ```
      
   * If no song is entered, the default song is `"rock + roll"` by the artist EDEN.

##### (c) `'movie-this'`

   * Liri will ask for a movie title.

   * The following info will be shown in the console:

     ```
       * Movie Title
       * Year Released
       * IMDB Rating
       * Rotten Tomatoes Rating
       * Country
       * Language
       * Plot
       * Actors
     ```

  * If no movie name is entered, the request will default to `"Jaws"`

##### (d) `'do-what-it-says'`

* Liri will take the text in `random.txt` and call a command according to the data on the txt file.
