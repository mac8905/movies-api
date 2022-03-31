import { ApolloServer } from 'apollo-server';
import { readFileSync } from 'fs';
import { PrismaClient } from '@prisma/client';
import path from 'path';
import resolvers from './resolvers';
import { getUserId } from './util';

const orm = new PrismaClient({
  log: ['query'],
});
const typeDefs = readFileSync(path.join(__dirname, 'schema.graphql'), 'utf-8');
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization || '';
    const userId = getUserId(token);
    return { orm, userId };
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
