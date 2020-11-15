const { graphQLServer, GraphQLServer } = require('graphql-yoga')


let links = [{
  id: 'link-0',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for GraphQL'
}]

// 1
let idCount = links.length
const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => links,
    link: (parent, args) => {
        const link = links.find(link => link.id === args.id)
        return link
    }
  },
  Mutation: {
    // 2
    post: (parent, args) => {
       const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      }
      links.push(link)
      return link
    },

    updateLink: (parent, args) => {
      let link = links.find(link => link.id === args.id)
      link.url = args.url
      link.description = args.description
      return link 
    },

    deleteLink: (parent, args) => {
      const link = links.find(link => link.id === args.id)
      const i = links.indexOf(link)
      links.splice(i, 1)
      return link 
    }

  },
}


const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
})
server.start(() => console.log(`Server is running on http://localhost:4000`))