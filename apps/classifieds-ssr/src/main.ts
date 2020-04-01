// import 'reflect-metadata';
import 'localstorage-polyfill';
import 'zone.js/dist/zone-node';
import * as express from 'express';
const { ngExpressEngine, AppServerModule, enableProdMode } = require('../../../dist/apps/classifieds/server/main');
import { APP_BASE_HREF } from '@angular/common';
const winston  = require('winston');
const  { Loggly } = require('winston-loggly-bulk');

// @todo: Required for https to function locally. Need to revisit on prod environment.
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

winston.add(new Loggly({
  token: '22fe7bd7-80d7-4dd7-baef-b1c80f4d59d8',
  subdomain: "smeskey",
  tags: ['dev', 'classifieds', 'ui_ssr'],
  json: true
}));

// The Express app is exported so that it can be used by serverless Functions.
export function app() {
  enableProdMode();
  const server = express();
  const distFolder = 'dist/apps/classifieds';
  const indexHtml = 'index';

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
  server.engine('html', ngExpressEngine({
    bootstrap: AppServerModule
  }));

  server.set('view engine', 'html');
  server.set('views', distFolder);

  // Example Express Rest API endpoints
  // app.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get('*.*', express.static(distFolder, {
    maxAge: '1y'
  }));

  // All regular routes use the Universal engine
  server.get('*', (req, res) => {
    res.render(indexHtml, { req, providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }] });
  });

  return server;
}

/*function run() {
  const port = process.env.PORT || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}*/

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = mainModule && mainModule.filename || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  // run();
}

export * from '../../../dist/apps/classifieds/server/main';
