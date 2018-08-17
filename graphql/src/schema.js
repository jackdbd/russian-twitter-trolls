// Welcome to Launchpad
// Log in to edit and save pads, run queries in GraphiQL on the right.
// Click "Download" above to get a zip with a standalone Node.js server.
// See docs and examples at https://github.com/apollographql/awesome-launchpad

// graphql-tools combines a schema string with resolvers.
import { makeExecutableSchema } from "graphql-tools";
import { v1 as neo4j } from "neo4j-driver";
import { neo4jgraphql } from "neo4j-graphql-js";
import typeDefs from "./typeDefs.graphql";

console.log(typeDefs);

const resolvers = {
  Query: {
    Hashtag(object, params, ctx, resolveInfo) {
      // neo4jgraphql inspects the GraphQL query and schema to generate a single Cypher query
      // to resolve the GraphQL query. Assuming a Neo4j driver instance exists in the context
      // the query is executed against Neo4j
      return neo4jgraphql(object, params, ctx, resolveInfo);
    },
    TweetsByText(object, params, ctx, resolveInfo) {
      return neo4jgraphql(object, params, ctx, resolveInfo);
    }
  }
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

let driver;
/** Get context from the request
 * headers: lowercased http headers
 * secrets: secrets defined in secrets section
 *
 * It returns an object (or a promise resolving to it).
 */
function context(headers, secrets) {
  if (!driver) {
    driver = neo4j.driver(
      secrets.NEO4J_URI || "bolt://localhost:7687",
      neo4j.auth.basic(secrets.NEO4J_USERNAME, secrets.NEO4J_PASSWORD)
    );
  }
  return { driver };
}

const rootValue = {};

export { schema, rootValue, context };

// Optional: Export a root function, that returns root to be passed
// during execution, accepting headers and secrets. It can return a
// promise. rootFunction takes precedence over rootValue.
// export function rootFunction(headers, secrets) {
//   return {
//     headers,
//     secrets,
//   };
// };
