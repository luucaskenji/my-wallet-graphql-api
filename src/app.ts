import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import { importSchema } from 'graphql-import';
import 'reflect-metadata';

import connectToDB from './database';
import resolvers from './resolvers';

dotenv.config();

const app = express();
app.use(cors());

const server = new ApolloServer({
  typeDefs: importSchema('./src/schema/schema.graphql'),
  context: (ctx) => ctx,
  resolvers,
  debug: false, // disables error stacktrace in response. formatError can also be used
});

server.applyMiddleware({ app });

connectToDB();

export default app;
