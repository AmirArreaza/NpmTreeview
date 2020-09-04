import * as express from 'express';
import * as cors from 'cors';
import { getPackage } from './package';

/**
 * Bootstrap the application framework
 */
export function createApp() {
  const app = express();
  const cors = require('cors')

  app.use(express.json());
  app.use(cors());

  app.get('/package/:name/:version', getPackage);

  return app;
}
