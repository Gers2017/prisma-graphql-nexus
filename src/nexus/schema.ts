import { makeSchema } from "nexus";
import { join } from "path";
import * as types from "./typeDefs";

export const schema = makeSchema({
  types,
  outputs: {
    schema: join(__dirname, "output", "schema.graphql"),
    typegen: join(__dirname, "generated", "nexus.ts"),
  },
  sourceTypes: {
    modules: [{ module: "@prisma/client", alias: "prisma" }],
  },
  contextType: {
    module: join(__dirname, "../database.ts"),
    export: "Context",
  },
});
