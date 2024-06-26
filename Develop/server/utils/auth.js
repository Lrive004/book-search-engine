const { GraphQLError } = require("mongoose");
const jwt = require("jsonwebtoken");

// set token secret and expiration date
const secret = "mysecretsshhhhh";
const expiration = "2h";

module.exports = {
  AuthenticationError: new GraphQLError("Authenthication error has occured.", {
    extensions: {
      code: "UNAUTHENTICATED",
    },
  }),
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
