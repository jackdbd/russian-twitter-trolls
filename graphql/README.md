# Russian Twitter Trolls GraphQL API Server

GraphQL server connected to a Neo4j database.

!["GraphQL API server"](../img/graphiql.png)


### Installation

This project was tested with Node `v10.9.0`. Some features might not available with older version. You may want to use [nvm](https://github.com/creationix/nvm) to manage your Node.js versions.

Install all dependencies with:

```shell
yarn install  # or simply, yarn
```

Build the server bundle (`public/bundle.js`) with [Webpack](https://webpack.js.org/):

```
yarn build
```


### Environment variables

The GraphQL API server code requires you to set some environment variables.

You can create a `.env` file in the root of *this* component (i.e. `graphql/`) and define your environment variables there; they will be loaded with [dotenv](https://github.com/motdotla/dotenv).

In alternative, you can set the environment variables from a terminal. Here is an example:

```shell
export NEO4J_USERNAME=neo4j
export NEO4J_PASSWORD=password
export NEO4J_URI=bolt://localhost:7687
export EXPRESS_PORT=3000
```


### Usage

If you installed Neo4j on your machine, check that it's running:

```sh
sudo service neo4j status
```

Launch the GraphQL API server:

```shell
yarn serve
```

You can use [Introspection](https://graphql.org/learn/introspection/) to ask the GraphQL API server for information about what queries it supports.

```
{
  __schema {
    types {
      name
    }
  }
}
```

Otherwise you can have a look at [neo4j_import.ipynb](https://github.com/jackdbd/russian-twitter-trolls/blob/master/import/neo4j_import.ipynb), the Jupyter notebook used to define and export the `typeDefs.graphql` file.


### Credits

This project was bootstrapped with [Apollo Launchpad](https://github.com/apollographql/awesome-launchpad).
