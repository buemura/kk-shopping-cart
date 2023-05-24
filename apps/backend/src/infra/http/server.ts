import { httpServer } from './config/server-http';

export const startServer = (): void => {
  const HOST = process.env.HOST ?? 'localhost';
  const PORT = process.env.PORT ?? 8080;

  httpServer.listen(PORT, () => {
    console.log(`Backend Server running at http://${HOST}:${PORT}`);
  });
};
