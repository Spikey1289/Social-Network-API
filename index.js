const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

// const cwd = process.cwd();

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extends: true}));
app.use(express.json());
app.use(routes);

db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`Running on port ${PORT}`);
    });
});