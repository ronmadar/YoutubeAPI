*** Video Portal Project

** Overview

This project is a video portal that fetches and displays videos from
a YouTube channel using the YouTube Data API. 
The portal features an autocomplete search functionality for videos and displays playlists 
with videos grouped under each playlist. 
The videos can be played using Video.js with YouTube support.

** Project Structure

index.js: The main script that initializes the application, fetches playlists and videos, and handles search functionality.
api.js: Contains functions for fetching playlists and videos from the YouTube Data API.
search.js: Handles the search input and autocomplete suggestions.
ui.js: Manages the display of playlists and videos.
utils.js: Utility functions for creating video elements and managing suggestion highlighting.

Dependencies
This project requires the following dependencies:

video.js: A library for handling video playback.
videojs-youtube: A plugin for Video.js to support YouTube videos.

* video.js@^8.17.2 videojs-youtube@^3.0.1

To install these dependencies, run:

npm install


*** Setup and Usage

** Clone the Repository

1 create a new folder 

mkdir newfolder

2 cd newfolder

3  git clone https://github.com/ronmadar/YoutubeAPI.git

4 cd YoutubeAPI

5 Install Dependencies

npm install

6 Run the Application

Open index.html in a web browser to view the application.

MY EXPLOR

https://developers.google.com/youtube/v3/docs 
i created a key - create a project , enable a youtube access and then create a Credential. and then the api key generated. 
*** API Key: AIzaSyDFrQMvXTZ9PARFXvLpcOTSeC8bBOu6Pw0 90ASASJHKNMASHJ

in any channel youtube has a id in the about section , and click on share button which will give me the channel ID
*** Channel Id: UCZnjaU2W0YZ-6n-CRiaCikQ
this is Channel Id of the channel: https://www.youtube.com/@MOOCsbyOUIL 

Now , if we go to https://developers.google.com/youtube/v3/docs and then click on channels , and then list i see on section Parameters has a id 
so in the right section has a inputs fileds(part:contentDetails, id:UCZnjaU2W0YZ-6n-CRiaCikQ ) with the title APIs Explorer, there i use two fileds to generate a new api key under the upload key word in json object we get.
click on execute and then i get this json with status 200 which mean successfull
*** there i get a "uploads": "UUZnjaU2W0YZ-6n-CRiaCikQ" that he is the same as the channel id of the user channel except second char in the API KEY.
and that upload id which is a playlist of the latest videos 

Now in order to get the actual videos , if we go to https://developers.google.com/youtube/v3/docs and then click on PlaylistItems , and then list (the items) again 
so in the right section has a inputs fileds(part:snippet, playlistId:UUZnjaU2W0YZ-6n-CRiaCikQ ) with the title APIs Explorer, there i use two fileds to generate a new api key under the upload key word in json object we get.
snippet means: give us the details of a videos.
playlistId: is the upload id 
click on execute and then i get this json with status 200 which mean successfull

and then i get HTTP request URL which we can use it in the fetch API
*** url: https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=15&playlistId=UUZnjaU2W0YZ-6n-CRiaCikQ&key=AIzaSyDFrQMvXTZ9PARFXvLpcOTSeC8bBOu6Pw0

Authorization: Bearer [YOUR_ACCESS_TOKEN]
Accept: application/json
