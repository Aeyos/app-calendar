# Pipefy Calendar App

## Summary

* [Setup](#setup)
* [Tests](#tests)

### Setup

To prepare your environment just run:

```bash
$ yarn install
```

Then you're up to run the calendar app, to do this you'll need to start the server:

```bash
$ yarn start
```

You can define which port will be listen with an environment variable, eg: `PORT=3001`.

After start the server you'll need to compile the application:

```bash
$ yarn compile
```

If you need to keep Webpack watching your changes add `-w`, eg: `yarn compile -w`.

> The Calendar App access the Pipefy's GraphQL API locally (in development environment), so you'll need to run the Pipefy App too (eg. `cd path/to/pipefy/ && rails s`).

#### Further Setting on Pipefy

To Calendar App access the GraphQL API properly, you need to do some settings on Pipefy too.

* Add the `CALENDAR_APP_URL` ENV var on `.env.local`, for example:

```
CALENDAR_APP_URL=localhost:3001
```

* Start the Pipefy App locally
* Create (or rename) a organization with the name __Pipefy Team__
* Access [OAuth2 Provider](http://localhost:3000/oauth/applications/) and create a new application
* Start the Pipefy App's console, eg: `cd path/to/pipefy/ && rails c`
* Run the following commands

```ruby
app = PlatformApp.find(1)
app.url = 'http://localhost:3001/manifest.json'
app.oauth_client_id = 'YOUR_APPLICATION_ID'
app.save!
```

### Tests

All files were linted with __ESLint__ and __Flow__ and formated with __Prettier__.

```bash
$ flow
$ eslint ./
$ prettier --config .prettierrc --write '**/*.js' '**/*.jsx'
```

And the app was tested with __Jest__, you can run:

```bash
$ yarn test
```
