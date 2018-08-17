# GraphQL server

GraphQL server connected to a Neo4j database.

Don't forget to start the Neo4j database with `sudo service neo4j start`.

### Installation

Install dependencies and use Webpack to build `public/bundle.js`.

```shell
yarn install
yarn build
```

### Environment variables

Either create a `.env` file and define your environment variables there, or define them from a terminal.

```shell
export NEO4J_USERNAME=<your value here>
export NEO4J_PASSWORD=<your value here>
export NEO4J_URI=<your value here>
export EXPRESS_PORT=3000
```

### Usage

Launch the server:

```shell
yarn serve
```
