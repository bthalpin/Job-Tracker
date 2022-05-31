const express = require('express');
const cors = require('cors');
const db = require('./config/connection');
const path = require('path');
const routes = require('./routes');
const jwt = require('jsonwebtoken');

require('dotenv').config()


const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors(corsOptions))

app.use(function(req, res, next) {
    console.log(req.headers)
    if (req.headers && req.headers.authorization) {
      jwt.verify(req.headers.authorization, process.env.JWT_SECRET, function(err, decode) {
        if (err) req.user = undefined;
        req.user = decode;
        next();
      });
    } else {
      req.user = undefined;
      next();
    }
  });

app.use(routes);

app.use('/public', express.static(path.join(__dirname, '../client/public')));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
}
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
    })
})
