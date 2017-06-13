import express from 'express';
import path from 'path';
import volleyball from 'volleyball';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import morgan from 'morgan';
import { signup, login } from './routes/user';
import { getRomanceMusics } from './routes/spotify';

const app = express();
const port = process.env.PORT || 8080;

app.use(volleyball);

app.use(express.static(path.resolve(__dirname, '..', 'client/dist')));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
    next();
});

app.get('/', (req, res) => {
    res.sendFile(path.resolve('client/dist/index.html'));
});

app.use((err, req, res, next) => {
    console.error(err);
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || 'Internal server error.');
});

const options = {
    server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
    replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } }
};

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost', options);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.post('/auth/login', login);
app.post('/auth/signup', signup);

app.get('/musics/:offset', getRomanceMusics);

app.listen(port, function () {
    console.log("Rockin' out on port 8080 homie");
});