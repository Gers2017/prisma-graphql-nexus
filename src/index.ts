import { ApolloServer } from "apollo-server";
import { schema } from "./nexus/schema";
import { context } from "./database";

const server = new ApolloServer({ schema, context });

server.listen().then(({ url }) => {
  console.log(`Server running at ${url}`);
});
