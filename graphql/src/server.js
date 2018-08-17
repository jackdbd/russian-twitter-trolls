require("dotenv").load();
import express from "express";
import bodyParser from "body-parser";
import { graphqlExpress, graphiqlExpress } from "apollo-server-express";
import { schema, rootValue, context } from "./schema";

if (!process.env.EXPRESS_PORT) {
  throw new Error("Please setup PORT in .env file.");
}
const EXPRESS_PORT = process.env.EXPRESS_PORT;

if (!process.env.NEO4J_USERNAME) {
  throw new Error("Please setup NEO4J_USERNAME in .env file.");
}
if (!process.env.NEO4J_PASSWORD) {
  throw new Error("Please setup NEO4J_PASSWORD in .env file.");
}
if (!typeof process.env.NEO4J_URI) {
  throw new Error("Please setup NEO4J_URI in .env file.");
}

const app = express();

app.use(
  "/graphql",
  bodyParser.json(),
  graphqlExpress(request => ({
    schema,
    rootValue,
    context: context(request.headers, process.env)
  }))
);

app.use(
  "/graphiql",
  graphiqlExpress({
    endpointURL: "/graphql",
    query: `# Welcome to GraphiQL
{
	Hashtag(tag:"politics") {
    tag 
    tweets {
      text
    }
  }
}`
  })
);

app.listen(EXPRESS_PORT, () => {
  console.log(`View GraphiQL at http://localhost:${EXPRESS_PORT}/graphiql`);
});
