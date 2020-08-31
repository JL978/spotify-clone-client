# Spotify Clone Front-End
A front-end clone project of the Spotify web player. The project was created using the create-react-app CLI. The app is meant to work in conjunction with an authorization/authenication server found at this [repo](https://github.com/JL978/spotify-clone-server).

## Table of Contents
- [Description](#description)
- [Motivation](#motivation)
- [Tech/Framework Used](#techframework-used)
- [Installation](#installation)
- [Reflection](#reflection)

## Description
A clone web application using the create-react-app. The app comsumes data from the Spotify API and tries to mimic the UI and front-end behaviours of the official [Spotify web player](https://open.spotify.com/) as much as possible.

![App Screen Shot](https://github.com/JL978/spotify-clone-client/blob/master/demo/FrontPage.png)
*The main screen (non-authenicated) of the app*

Like the official app, if a user is not authenticated, they can still browse and look up different playlists, albums, artists and users. Non authenticated users cannot control the player and go to certain protected routes - if they tried to navigate to these routes, a tooltip pops up prompting login.

![Non-authenticated app demonstration](https://github.com/JL978/spotify-clone-client/blob/master/demo/NonAuthed.gif)
*Non-authenticated app demonstration*

If a user login to a premium account (due to the limitation of the available API, free accounts cannot do much), user can access certain routes to their own playlists, saved items, etc. and use the app as a remote control player to any playing official (no direct streaming is available through the API)

![Authenticated app demonstration](https://github.com/JL978/spotify-clone-client/blob/master/demo/Authed.gif)
*Authenticated app demonstration*

![Remote player demonstration](https://github.com/JL978/spotify-clone-client/blob/master/demo/RemotePlay.gif)
*Remote player demonstration*

## Motivation
This project was created by me mainly to teach myself React development. Since the point of this project was not to make great UI/UX design choices, I chose to create a clone of a well established  product as to shorten my learning time and not to focus on the wrong thing. Since I am already a heavy Spotify user and therefore I thought it would be an interesting challenge to tackle. 

The majority of the react components and logic was written from scratch by myself. I chose not to use existing component libraries because that forces me to both get a really deep understanding of React and get as much practice as I could with React.

## Tech/Framework Used
* React (create-react-app CLI)
* react-router-dom
* axios


## Installation
This project requires [node](http://nodejs.org) and [npm](https://npmjs.com) installed globally. 

Clone the repository to a directory of your choosing

```sh
$ git clone https://github.com/JL978/spotify-clone-client.git
```
Navigate into spotify-clone-client and install the necessary packages

```sh
$ npm install 
```
To start up the app locally

```sh
$ npm start
```

Additionally, this project also requires you to clone and run the server code from this [repository](https://github.com/JL978/spotify-clone-server) to work properly.

## Reflection
[coming soon]
