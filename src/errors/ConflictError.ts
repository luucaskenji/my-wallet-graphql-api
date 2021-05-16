import { ApolloError } from 'apollo-server-express';

class ConflictError extends ApolloError {
  constructor(message: string) {
    super(message);

    Object.defineProperty(this, 'name', {
      value: 'ConflictError',
    });
  }
}

export default ConflictError;
