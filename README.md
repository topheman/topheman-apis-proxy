topheman-apis-proxy
===================
[![Build Status](https://travis-ci.org/topheman/topheman-apis-proxy.svg?branch=master)](https://travis-ci.org/topheman/topheman-apis-proxy)

As a frontend developer, when I try new frameworks, make POCs, work on a little personal projects, what I'm missing to make it more interesting for me and the end-users who will test my work is **data**.

This is what this project is about : giving you a backend that will let you access public APIs such as Twitter or Github to get data to feed on and not have to bother about the server-side, focus on the client side.

Projects relying on topheman-apis-proxy :

* [topheman/react-es6](https://github.com/topheman/react-es6)
* [topheman/react-es6-isomorphic](https://github.com/topheman/react-es6-isomorphic)

## Introduction

This server is expressJS based, it's basically a **proxy for public APIs** (Twitter's and Github's are currently available).

It's fully configurable via plugins :

* You can activate / deactivate the access to an API
* You can manage CORS
* You can disable jsonp

If you want to contribute (see section bellow) :

* It's easily extendable :
	* You can add a proxy to your own APIs (with the out of box support of the plugins above)
	* You can add other plugins
* It's unit tested


## Installation

If you don't have grunt, you'll need to `npm install grunt-cli -g`

```shell
git clone https://github.com/topheman/topheman-apis-proxy.git
cd topheman-apis-proxy
npm install
grunt init
```

Works on node v0.10, v0.12, v4 & v5 ([see travis tests](https://travis-ci.org/topheman/topheman-apis-proxy)).

## Setup

### Credentials

Setup your API credentials in `config/local.env.js` - this file was created at the `grunt init` step and will be ignored by git (your credentials will stay on computer).

To retrieve such credentials :

* [For twitter](https://apps.twitter.com/app/new)
* [For Github](https://github.com/settings/applications/new)
* For npm registry: no need - I simply added the CORS feature

### Configuration

In the `config/environment/` folder, you'll find configuration files for each environment development/production/test. For each api, you can specify the following :

* active : `true` / `false` (if false won't even add the handler)
* cors : to manage cross-origin request :
	* `false` (or not existant) : no CORS
	* `true` : accepts all CORS
	* string or array of string like `*.foo.com` or `['*.foo.com','bar.com']` : accepts only the matching domain for cross-origin requests
* jsonp : to disable jsonp, specify the name of the parameter where the callback is passed (for example in github, it is `callback`)
* delay : to delay the response (use only in dev mode) specify a number in milliseconds
* token : if you only want to open your api to authenticated requests, you can either set :
	* a string which you'll have to pass in the `X-Auth-Token` http header
	* or a function (if you want to match the user to its session or a db), with the following signature (you have examples in the [tests config](https://github.com/topheman/topheman-apis-proxy/blob/develop/config/environment/test.js) - see in the [unit tests](https://github.com/topheman/topheman-apis-proxy/blob/develop/test/spec/handlers.config.token.spec.js) how it's requested) :

```js
function(token, request, next){
	if(token === "mytoken"){
		next(true);//authorized
	}
	else{
		next(false);//will http 403 Forbidden
	}
}
```

Note : You can skip this part if you don't have any specific configurations.

## Run in local

The following commands will launch a server on http://localhost:8000

* `grunt serve` : launches in development mode (callstack will show on error)
* `grunt serve:debug` : launches in development mode + server will reload on file modifications (nodemon)
* `grunt serve:prod` : launches in production mode (no callstack on error)
* for more grunt tasks see contributors section

Note : I use grunt tasks to launch the server, so that it will inject the variables you just set in `local.env.js` as environment variables accessible from `process.env`. You can also use the npm scripts I defined in the package.json (you will have to set your env variables manually).

## Deployment

No matter how you deploy, **don't forget to set as environment variables your API keys** and the `NODE_ENV=production`.

Once you did that, you can `npm start`.

Note : I use heroku for that, so my deployment routine comes down to that :

* Set the environment variables via ssh once :
	* `heroku config:set NODE_ENV=production`
	* `heroku config:set GITHUB_CLIENT_ID=whateverIsYourClientId`
	* `heroku config:set GITHUB_CLIENT_SECRET=whateverIsYourClientSecret`
	* `heroku config:set TWITTER_CONSUMER_KEY=whateverIsYourConsumerKey`
	* ...
* `git push heroku master` (heroku being the remote repo linked to my vm)
* the server will restart using the `npm start` script which has now all that it needs.

## Contributors

Help is welcome ! I accept pull-requests.

As you'll see the code is well modularised, so if you want to :

* [make a proxy to an other API](https://github.com/topheman/topheman-apis-proxy/tree/master/apis)
* [add an other plugin](https://github.com/topheman/topheman-apis-proxy/tree/master/plugins)

You should find your way and it could benefit others.

### Unit tests

The code is widely unit tested. To run the tests : `npm test`

Note : no request to any APIs will be made while passing unit tests, mocks and stubs are setup so that you can run the tests without internet connexion (without also bothering about rate limits).

You can launch your server in test mode (with the test handlers mounted) on http://localhost:8000.

* `grunt serve:test`
* `grunt serve:test-debug` : usefull to dev/debug your tests (nodemon)

Keep in mind that `npm test` launches one server on which the test are passed and another on port 8001 that the first one uses to proxy some mocks (but you don't have to bother about it, they automatically start and stop with the npm script).

## FAQ

... section to come ...

## License

This software is distributed under an MIT licence.

Copyright 2015 © Christophe Rosset

> Permission is hereby granted, free of charge, to any person obtaining a copy of this software
> and associated documentation files (the "Software"), to deal in the Software without
> restriction, including without limitation the rights to use, copy, modify, merge, publish,
> distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the
> Software is furnished to do so, subject to the following conditions:
> The above copyright notice and this permission notice shall be included in all copies or
> substantial portions of the Software.
> The Software is provided "as is", without warranty of any kind, express or implied, including
> but not limited to the warranties of merchantability, fitness for a particular purpose and
> noninfringement. In no event shall the authors or copyright holders be liable for any claim,
> damages or other liability, whether in an action of contract, tort or otherwise, arising from,
> out of or in connection with the software or the use or other dealings in the Software.
