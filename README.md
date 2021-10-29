# Norbert's Gambit Calculator

:moneybag: A simple app to help execute [Norbert's Gambit](https://wealthsavvy.ca/norberts-gambit-questrade/) and convert between USD and CAD using a brokerage account.

I based this calculator off a post by [walthsavvy](https://wealthsavvy.ca/norberts-gambit-questrade/).

<kbd> 
<img src="https://user-images.githubusercontent.com/85373263/139501176-4df860a2-77ad-4948-8c4d-3e6accc562d1.png"/>
</kbd>

### Features & Design

- :dog: Fetches exchange rate and stock price data from the [Yahoo Finance API](https://www.yahoofinanceapi.com/).
- :brain: In-memory cache to limit API calls.
- :skull: [Skeleton CSS](http://getskeleton.com/) used as simple CSS boilerplate.

### TODO

- [ ] add proper error handling to calculate.js and server.js
- [ ] create the USD to CAD version of the calculator and allow user to toggle between calculators
- [ ] review 'USD recieved' calculation. There appears to be an error in the wealthsavvy post. do I need an actual 'USD recieved' calc with all fees subtracted? Seems to be errors in the [walthsavvy post](https://wealthsavvy.ca/norberts-gambit-questrade/) where fees are not subtracted.

# Setup

```
npm install
```

- No API key needed.

# Development

### Server

Start server with nodemon:

```
cd server
npm run dev
```

### Client

Start client with lite-server:

```
cd client
npm run start
```

or snowpack:

```
cd client
npm run dev
```

# Deployment

### Heroku Deployment

Back end server currently deployed on heroku at https://norberts-gambit.herokuapp.com/

- Deployed from github subdirectory server using https://github.com/timanovsky/subdir-heroku-buildpack.git

  - add above github url as first heroku buildpack
  - add heroku nodejs as section buildpack

### Vercel Deployment

Front end currently deployed on vercel at https://norberts-gambit.vercel.app/

Change `const SERVER_URL` in `/client/build/calculate.js` to url of your server.

- Vercel settings for deployment:
  - Root Directory: `client/build`
  - Build Command: override with `npm run build`
  - Output Directory: override with `.`
  - Install Command: override with `npm install`

# Screenshots

<kbd> 
<img src="https://user-images.githubusercontent.com/85373263/139501176-4df860a2-77ad-4948-8c4d-3e6accc562d1.png"/>
</kbd>
</br>
</br>

<kbd> 
<img src="https://user-images.githubusercontent.com/85373263/139501229-17c8cf72-a3ed-4249-aced-e7074aeaacfd.png"/>
</kbd>
</br>
</br>

<kbd> 
<img src="https://user-images.githubusercontent.com/85373263/139501265-23a33ad1-e08e-4524-9354-c48d8f69a535.png"/>
</kbd>
