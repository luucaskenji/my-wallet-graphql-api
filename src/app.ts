import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import { importSchema } from 'graphql-import';
import 'reflect-metadata';

import connectToDB from './database';

dotenv.config();

const app = express();
app.use(cors());

const server = new ApolloServer({
  typeDefs: importSchema('./src/schema/schema.graphql'),
});

server.applyMiddleware({ app });

connectToDB();

export default app;
