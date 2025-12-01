const jsonServer = require('json-server');
const bodyParser = require('body-parser');
const path = require('path');

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

server.use(middlewares);

// increase JSON body size limit to 10mb (adjust if needed)
server.use(bodyParser.json({ limit: '10mb' }));
server.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

// simple request logger to help debug
server.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
  next();
});

server.use(router);
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`JSON Server running on http://localhost:${PORT} (body limit 10mb)`);
});
