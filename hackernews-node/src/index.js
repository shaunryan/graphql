const { graphQLServer, GraphQLServer } = require('graphql-yoga')
const { PrismaClient } = require('@prisma/client')

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: async (parent, args, context) => {
      return context.prisma.link.findMany()
    },
    link: async (parent, args, context) => {
      const link = await prisma.link.findOne({
        where: {
            id: Number(args.id)
        }
      })
      return link
    }
  },

  Mutation: {
    // 2
    post: (parent, args, context) => {
      const newLink = context.prisma.link.create({
        data: {
          url: args.url,
          description: args.description,
        },
      })
      return newLink
    },

    updateLink: (parent, args, context) => {
      const link = context.prisma.link.update({
        where: {
          id: Number(args.id)
        },
        data: {
          url: args.url,
          description: args.description
        }
      })
      return link
    },

    deleteLink: (parent, args, context) => {
      const link =context.prisma.link.delete({
        where: {
            id : Number(args.id)
        }
      })
      return link
    }

  },
}

const prisma = new PrismaClient()

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: {
      prisma,
    }
})
server.start(() => console.log(`Server is running on http://localhost:4000`))