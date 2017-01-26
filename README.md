# ReactRank

https://reactrank.firebaseapp.com

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Setup

Prerequisites:
* `npm` >= 4
* Github personal access token. Create one here: https://github.com/settings/tokens

### Step 1: install dependencies

```
npm install
```

### Step 2: load data from Github

```
export GITHUB_TOKEN=xxxyourgithubtokenxxx
npm run fetch-data
npm run process-data
```

Note that `fetch-data` script can take some time to download data from Github's API.
Also, Github has a rate limit of 5000 requests per hour - if the script fails, you may retry it in an hour.

### Step 3: start server

```
npm start
```

Visit http://localhost:3000

## Deployment

```
npm run build
```

The built application is available in `build` directory.

To deploy to firebase:

```
firebase deploy
```

## Tests

Make sure to follow instructions in `Setup` section first.

```
npm test
```

## Development notes

This application uses a few libraries on the client:

* `react` & `react-dom` - UI framework
* `react-router` - adds declarative routing on top of react
* `react-router-scroll` - browser-like scroll behavior with react-router (useful when going back to infinite pagination)
* `octicons` - beautiful icons by Github
* `lodash` - small functional utilities

Postcss with cssnext is used to write stylesheets in upcoming standard.
CSS-Modules approach allows for easy styling of individual components.

I tested the application on newest Chrome, Firefox and iOS Safari.
