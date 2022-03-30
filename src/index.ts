import { ApolloServer } from 'apollo-server';
import { readFileSync } from 'fs';
import { PrismaClient } from '@prisma/client';
import path from 'path';
import resolvers from './resolvers';

const orm = new PrismaClient();
const typeDefs = readFileSync(path.join(__dirname, 'schema.graphql'), 'utf-8');
const server = new ApolloServer({ typeDefs, resolvers, context: { orm } });

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
