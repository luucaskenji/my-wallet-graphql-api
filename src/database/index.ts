import { createConnection } from 'typeorm';
import ormConfig from './ormconfig';

const connectToDB = async () => {
  const connection = await createConnection(ormConfig);
  console.log(`App connected to the DB ${connection.options.database}`);

  process.on('SIGINT', async () => {
    await connection.close();
    console.log('Connection with DB closed');
  });
};

export default connectToDB;
