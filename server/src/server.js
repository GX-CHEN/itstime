import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import router from './router';
import bodyParser from 'body-parser';

// Initialize http server
const app = express();
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(bodyParser.json());

// Logger that outputs all requests into the console
app.use(morgan('combined'));
// Use v1 as prefix for all API endpoints
app.use('/v1', router);

const server = app.listen(3001, () => {
  const { address, port } = server.address();
  console.log(`Listening at http://${address}:${port}`);
});
