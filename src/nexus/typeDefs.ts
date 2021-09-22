import { objectType, queryType, stringArg, mutationType, nonNull } from "nexus";

export const Creator = objectType({
  name: "Creator",
  definition(t) {
    t.int("id");
    t.string("username");
    t.list.field("posts", {
      type: Post,
      resolve(_root, _args, ctx) {
        return ctx.prisma.post.findMany();
      },
    });
  },
});

export const Post = objectType({
  name: "Post",
  definition(t) {
    t.int("id");
    t.string("title");
    t.string("description");
    t.field("author", { type: Creator });
  },
});

export const Query = queryType({
  definition(t) {
    t.string("Hello", {
      resolve: () => "Hello world!",
    });

    t.list.field("Creators", {
      type: Creator,
      resolve(_root, _args, ctx) {
        return ctx.prisma.creator.findMany({
          include: {
            posts: true,
          },
        });
      },
    });

    t.list.field("Posts", {
      type: Post,
      resolve(_root, _args, ctx) {
        return ctx.prisma.post.findMany({
          include: {
            author: true,
          },
        });
      },
    });
  },
});

export const Mutation = mutationType({
  definition(t) {
    t.field("addCreator", {
      type: "Creator",
      args: {
        username: nonNull(stringArg()),
      },
      resolve(_root, { username }, ctx) {
        return ctx.prisma.creator.create({
          data: {
            username,
          },
          include: {
            posts: true,
          },
        });
      },
    });
  },
});
