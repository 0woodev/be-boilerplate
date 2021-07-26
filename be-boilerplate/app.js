const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');

const errorHandler = require('./middlewares/error-handler');
const router = require('./routes');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// app.use('/public', express.static(path.join(__dirname, 'src', 'public'))); // 경로 미정
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', router);

app.use(errorHandler);

app.use(express.static(path.resolve(__dirname, '../client', 'assets')));
app.use(express.static(path.resolve(__dirname, '../client', 'dist')));
app.get('/*', (req, res) => {
	res.sendFile(path.resolve(__dirname, '../client', 'dist', 'index.html'));
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`Server Listening on ${port}`);
});
