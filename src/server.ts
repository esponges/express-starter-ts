import app from './app';
import { config } from './config';
import logger from './utils/logger';

const startServer = () => {
  try {
    const server = app.listen(config.port, () => {
      logger.info(
        `Server running in ${config.nodeEnv} mode on port ${config.port}`
      );
    });

    // Graceful shutdown
    const shutdown = () => {
      logger.info('Received shutdown signal. Closing HTTP server...');
      server.close(() => {
        logger.info('HTTP server closed.');
        process.exit(0);
      });
    };

    process.on('SIGTERM', shutdown);
    process.on('SIGINT', shutdown);
  } catch (error) {
    logger.error('Error starting server:', error);
    process.exit(1);
  }
};

startServer();
