import { ApolloError } from 'apollo-server-express';

class NotFoundError extends ApolloError {
  constructor(message: string) {
    super(message);

    Object.defineProperty(this, 'name', {
      value: 'NotFoundError',
    });
  }
}

export default NotFoundError;
