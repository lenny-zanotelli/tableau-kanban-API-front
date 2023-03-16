/* ---------- DotEnv ---------- */
const dotenv = require('dotenv');
dotenv.config();

/* ---------- Express ---------- */

const express = require('express');
const multer = require('multer');
const bodyParser = multer();
const router = require('./app/router');
const cors = require('cors');
const middlewares = require('./app/middlewares')

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json()); //

/* ---------- Middlewares ---------- */
app.use(cors('*')); // On autorise tout les domaines à faire du Cross Origin Resource Sharing.
app.use(bodyParser.none());
app.use(middlewares.bodySanitizer);
app.use(router);

app.use(express.static('assets'));
app.use(middlewares.notFoundMiddleware);

/* ---------- App ---------- */

app.listen(PORT, () => {
    console.log(`Listening on ${PORT} ...`);
})