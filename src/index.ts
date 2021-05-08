import app from './app';

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

process.on('SIGINT', () => {
  server.close();
  console.log('Server killed');
});
