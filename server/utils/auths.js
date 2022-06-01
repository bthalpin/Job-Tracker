const jwt = require('jsonwebtoken');
require('dotenv').config()

const secret = process.env.JWT_SECRET;
const expiration = '2h';

module.exports = {
    authMiddleware: function ({ req }) {
        // console.log('HERE',req)
        // console.log(req,'HERE')
        let token = req.headers.authorization;
        // console.log('here')
        if (req.headers.authorization) {
            token = token.split(' ').pop().trim();
        }

        if (!token) {
            return req;
        }
        // console.log(token,'tets')
        try {
            const { data } = jwt.verify(token, secret, { maxAge: expiration });
            req.user = data;
        } catch {
            console.log('Invalid token');
        }

        return req;
    },
    loginRequired:function(req, res, next) {
        console.log(req,'tets')
        if (req.user) {
          next();
        } else {
      
          return res.status(401).json({ message: 'Unauthorized user!!' });
        }
      },
    // can add userName to signToken function and payload if needed
    signToken: function ({ email, _id }) {
        const payload = { email, _id };

        return jwt.sign({ data: payload}, secret, { expiresIn: expiration });
    },
};