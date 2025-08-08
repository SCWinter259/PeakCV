import express from 'express';
import cors from 'cors';
import router from './routes';

const PORT = 3001

// initialize the app
const app = express();
app.use(express.json()); // ensure that incoming request is a JSON Object
// app.use(express.urlencoded({ extended: true })); // for application/x-www-form-urlencoded (we use json, but this one is better for testing?)
app.use(cors());

app.use("/", router);

// start the server
app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`)
});