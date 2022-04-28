const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');

const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler.js');

const app = express();
const port = proccess.env.PORT || 3000;

app.use(express.json());

const whiteList = ['http://localhost:8080', 'https://lautistr.com'];
const options = {
  origin: (origin, cb) => {
    if (whiteList.includes(origin) || !origin) {
      cb(null, true);
    } else {
      cb(new Error('Not allowed'));
    }
  }
}
app.use(cors(options));

app.get('/', (req, res) => {
  res.send('Hola mi server en express');
});

app.get('/nueva-ruta', (req, res) => {
  res.send('Hola, soy una nueva ruta');
});

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log('Mi port' +  port);
});
