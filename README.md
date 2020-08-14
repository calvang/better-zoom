# Better-Zoom

A WebRTC video chat and messaging web application that prioritizes anonymity and simplicity.

![img](images/example.png)

## Description

This web application doesn't require any user credentials and allows creation of arbitrary usernames and room ID's for convenience. Users can create their own room ID's and share them, which allows complete freedom for using the platform.

## For Developers

### Local Development

To build locally, run:

`yarn install`

To run this locally from the source code, run:

`yarn run dev`

If you want to run all the processes separately, execute these three commands in order:

`peerjs --port 9000`

`yarn run watch`

`yarn start`

To test a production deployment to localhost:5000, run:

`yarn test-deploy`

### Deployment

Follow these steps to initialize and deploy a Heroku app: 

https://devcenter.heroku.com/articles/getting-started-with-nodejs?singlepage=true

After logging in and initializing Heroku for the app, you can test a local deployment to port 5000 using: 

`yarn test-heroku`

Before deploying, place the URL of your Heroku app in /src/api.json so that socket.io and peerjs carry over functionality.

To deploy, run this command to push to the Heroku branch: 

`yarn deploy-heroku`