const _server = require('http').createServer(require('./server/app'));

const port = process.env.PORT || 3000;
const server = _server.listen(port, () => { console.log(`listening on ${port}`) })