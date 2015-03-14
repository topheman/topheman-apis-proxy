topheman-apis-proxy
===================

As a frontend developer, when I try new frameworks, make POCs, work on a little personal projects, what I'm missing to make it more interesting for me and the end-users who will test my work is **data**.

This is what this project is about : giving you a backend that will let you access public APIs such as Twitter or Github to get data to feed on and not have to bother about the server-side, focus on the client side.

##Introduction

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


##Installation

If you don't have grunt, you'll need to `npm install grunt-cli -g`

```shell
git clone https://github.com/topheman/topheman-apis-proxy.git
cd topheman-apis-proxy
npm install
grunt init
```

##Setup

###Credentials

Setup your API credentials in `config/local.env.js` - this file was created at the `grunt init` step and will be ignored by git (your credentials will stay on computer).

To retrieve such credentials :

* [For twitter](https://apps.twitter.com/app/new)
* [For Github](https://github.com/settings/applications/new)

###Configuration

In the `config/environment/` folder, you'll find configuration files for each environment development/production/test. For each api, you can specify the following :

* active : `true` / `false` (if false won't even add the handler)
* cors : to manage cross-origin request :
	* `false` (or not existant) : no CORS
	* `true` : accepts all CORS
	* string or array of string like `*.foo.com` or `['*.foo.com','bar.com']` : accepts only the matching domain for cross-origin requests
* jsonp : to disable jsonp, specify the name of the parameter where the callback is passed (for example in github, it is `callback`)
* delay : to delay the response (use only in dev mode) specify a nummber in milliseconds

Note : You can skip this part if you don't have any specific configurations.

##Run in local

The following commands will launch a server on http://localhost:8000

* `grunt serve` : launches in development mode (callstack will show on error)
* `grunt serve:debug` : launches in development mode + server will reload on file modifications (nodemon)
* `grunt serve:prod` : launches in production mode (no callstack on error)
* for more grunt tasks see contributors section

Note : I use grunt tasks to launch the server, so that it will inject the variables you just set in `local.env.js` as environment variables accessible from `process.env`. You can also use the npm scripts I defined in the package.json (you will have to set your env variables manually).

##Deployment

No matter how you deploy, **don't forget to set as environment variables your API keys** and the `NODE_ENV=production`.

Once you did that, you can `npm start`.

Note : I use heroku for that, so my deployment routine comes to thats :

* Set the environment variables via ssh once :
	* `heroku config:set NODE_ENV=production`
	* `heroku config:set GITHUB_CLIENT_ID=whateverIsYourClientId`
	* `heroku config:set GITHUB_CLIENT_SECRET=whateverIsYourClientSecret`
	* `heroku config:set TWITTER_CONSUMER_KEY=whateverIsYourConsumerKey`
	* ...
* `git push heroku master` (heroku being the remote repo linked to my vm)
* the server will restart using the `npm start` script which has now all that it needs.

##Contributors

Help is welcome ! I accept pull-requests.

As you'll see the code is well modularised, so if you want to :

* make a proxy to an other API
* add an other plugin

You should find your way and it could benefit others.

###Unit tests

The code is widely unit tested. To run the the tests :

* `grunt serve:test`
* `npm test`

The server has to be running while the test are run, no request to any APIs will be made though, mocks and stubs are setup so that you can run the tests without internet connexion (without also bothering about rate limits).

When you develop your unit tests, you will like to : `grunt serve:test-debug` (it launches the server in test mode with nodemon).

##FAQ

##License

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