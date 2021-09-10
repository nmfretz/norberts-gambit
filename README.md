# Norbert's Gambit Calculator

:moneybag: A simple app to help execute [Norbert's Gambit](https://wealthsavvy.ca/norberts-gambit-questrade/) and convert between USD and CAD using a brokerage account.

I based this calculator off a post by [walthsavvy](https://wealthsavvy.ca/norberts-gambit-questrade/).

<kbd> 
<img src="https://user-images.githubusercontent.com/85373263/132903636-c06c7e40-4f51-4cc9-95ce-f46c05a5a0b8.png"/>
</kbd>

### Features & Design

- :dog: Fetches exchange rate and stock price data from [Alpha Vantage](https://www.alphavantage.co/) API.
- :brain: In-memory cache to limit API calls
- :skull: [Skeleton CSS](http://getskeleton.com/) used as simple CSS boilerplate

# Setup

```
npm install
```

- Rename `.env.sample` to `.env` and update with your [Alpha Vantage](https://www.alphavantage.co/) API key

# Development

### Server

Start server with nodemon.

```
cd server
npm run dev
```

### Client

Start client with lite-server

```
cd client
npm run dev
```

# Deployment

Change `const SERVER_URL` in `/client/calculate.js` to url of your server.

# Screenshots

<kbd> 
<img src="https://user-images.githubusercontent.com/85373263/132903636-c06c7e40-4f51-4cc9-95ce-f46c05a5a0b8.png"/>
</kbd>
</br>

<kbd> 
<img src="https://user-images.githubusercontent.com/85373263/132903711-4d043da2-697c-428c-9dba-4c7c3ed8aeb0.png"/>
</kbd>
</br>
</br>

<kbd> 
<img src="https://user-images.githubusercontent.com/85373263/132903722-fe57458b-64a9-4260-8357-e364d46f8815.png"/>
</kbd>
