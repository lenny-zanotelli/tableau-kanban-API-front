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


app.use(express.json()); // C'es tun peu comme si on disait à Expresse : "passe en mode json" => on le prépare à envoyer/recevoir des données au format JSON
//On a plus besoin d'urlEncoded. Le json est suffisant puisque nos requetes sont/seront formatées en json
//urlEncoded aurait été intéressant si on ne formattait pas les données en json.

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