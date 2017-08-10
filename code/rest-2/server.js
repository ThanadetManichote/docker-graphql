var express     = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');
var fetch       = require('isomorphic-fetch');
var RestHelper  = require('./helper/RestHelper.js');

const Trueyou  = require('./model/Trueyou');
const FiveStar = require('./model/FiveStar');

var schemaString = ''

var TY  = new Trueyou()
var KY  = new FiveStar()

schemaString = schemaString + TY.getSchema()
schemaString = schemaString + KY.getSchema()

schemaString = schemaString + `  

  type Query {
     trueyou : Trueyou
     fivestar : FiveStar
  }
`;

console.log(schemaString)

// Construct a schema, using GraphQL schema language
var schema = buildSchema(schemaString);

// The root provides the top-level API endpoints
var root = {
  trueyou: function (){
    return new Trueyou();
  },
  fivestar : function(){
    return new FiveStar();
  }
}

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');