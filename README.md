# Spotify Clone Front-End
A front-end clone project of the Spotify web player. The project was created using the create-react-app CLI. The app is meant to work in conjunction with an authorization/authenication server found at this [repo](https://github.com/JL978/spotify-clone-server).

## Table of Contents
- [Description](#description)
- [Motivation](#motivation)
- [Tech/Framework Used](#techframework-used)
- [Installation](#installation)
- [Architechture](#architecture)

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

Additionally, this project also requires you to clone and run the server code from this [repo](https://github.com/JL978/spotify-clone-server) to work properly.

## Architecture
### Authentication and Authorization

As mentioned from before this app needs to be used with a authentication server with the code provided on another [repo](https://github.com/JL978/spotify-clone-server), you can navigate there to learn more about how the server works. On this end, in order to be logged in, the app must have 2 things: a refresh_key stored in cookie and an access_key stored in memory. When there these values are present, the user is effectively "logged in" and therefore the app will render the "logged in" version with the user's personal info. The benefit of doing authorization this way is that we are not exposed to XSRF by avoiding having the access_key stored in cookie while also keeping the user logged in if they refresh the app through the following flow.

[Authorization flow](demo/auth.png)

As far as I know, this is the safest way to handle keys in OAuth flow.  

### Custom hooks and utilities

One of the more interesting functionality from this project is the infinite scroll on playlists and search results. This feature was made using custom hooks and integration with the Spotify API pagination system.

The hooks was named useInfiScroll and useTokenScroll, they are both effectively the same with the useTokenScroll requesting for private information with the access token. The hook make use of useState, useRef, useCallback and the IntersectionObserver API. It takes in a setList (from a useState hook) function from the parent component (which is use internally to set the paginated list) and return a useCallback ref to be passed to the last element of the list and a setNext to store the next paginated uri during initial setup. The challenge of using ref here is the use of functional component in this project which one cannot simply pass a ref parameter to. The solution to this is using React.forwardRef on the child component. One thing I would do different next time is to use [Composition as much as possible instead of Inheritance](https://reactjs.org/docs/composition-vs-inheritance.html) so that I don't have to pass refs through multiple component levels.

Another interesting feature of this app is the live search feature where search results are updated as the user type into the search box. In doing this, the app is making a new request to the API everytime a new letter is entered. However, sometimes typing can be a faster than the request is able to finish and the request may become stale as the user type. Therefore, being able to cancel the request on the fly is needed.  

[More coming soon...]
