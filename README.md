## Back End Tech Stack

| Library          | Version       |
| ---------------- | ------------- |
| Node             | ^8.9.0        |
| npm              | ^5.5.0        |
| Express          | 4             |
| Mongoose         | 4             |

## Front End Tech Stack

| Library          | Version       |
| ---------------- | ------------- |
| React            | 16            |
| React Router     | 4             |
| React Redux      | 5             |
| @axa/web-toolkit | 2.0.0-alpha.3 |

# Running

## Setup

```sh
$ git clone https://`YOUR-GITHUB-AXA-TOKEN`@github.axa.com/axa-singapore/api-access-manager.git
$ cd api-access-manager
$ cp docker-compose-override.example.yml docker-compose-override.yml
$ cp .env.example .env
$ npm install
```

___

# Prerequite

You will need a local mongoDB and a Kong instance to test the entire flow.

Make sure to have a locally running MongoDB instance (unless you are running the dockerized version of the app. See #Docker below)

To test full flow, make sure to have a running Kong instance. You can start a local one via:

```sh
$ npm run kong:docker
```

## Development

To run the both backed server and frontend client, code linter, in parallel, while watching for changes and reloading automatically:

```sh
$ npm run dev:watch
```

To run the both backed server and frontend client in parallel without watching

```sh
$ npm run dev
```

To run each watch/auto-reload task separately:

- `npm run server:watch`
- `npm run client:watch`
- `npm run lint:watch`
- `npm run test:spec:watch`
- `npm run test:e2e:watch`

### Generating the unit test coverage report

```sh
$ npm run spec:coverage
```

The coverage report will be generated as `coverage/index.html`.

___


## Production

To build and run locally. You must build before you are able to run with `start`

```sh
$ npm build
$ npm start
```

To build dist folder only

```sh
$ npm run build
```

To run each part separately:

```sh
$ npm run build:server
$ npm run build:client
```

___


## Docker

To start a fully dockerised app build with a local kong, first add the NPM-TOKEN to docker-compose-override.yml

```sh
$ npm run dev:docker
```

To run each part separately:

- app
```sh
$ docker-compose up
OR
$ npm run app:docker
```

- kong
```sh
$ cd kong-local
$ docker-compose up
OR
$ npm run kong:docker
```
