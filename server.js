const { app } = require('./dist/apps/classifieds-ssr/main');
// const port = process.env.PORT || 4000;

// Start up the Node server
const server = app();
server.listen(4000, () => {
  console.log(`Node Express server listening on http://localhost:4000`);
});
