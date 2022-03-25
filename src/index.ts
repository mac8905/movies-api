import { ApolloServer } from 'apollo-server';
import path from 'path';
import { readFileSync } from 'fs';

const typeDefs = readFileSync(path.join(__dirname, 'schema.graphql'), 'utf-8');

const resolvers = {
  Query: {},
  Mutation: {
    register: (
      _parent: any,
      args: { input: any },
      _context: { dataSources: { userAPI: { register: (arg0: any) => any } } },
      _info: any,
    ) => {
      return {
        id: '1',
        name: args.input.name,
        email: args.input.email,
        password: args.input.password,
      };
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
