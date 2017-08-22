var express     = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');
var fetch       = require('isomorphic-fetch');
var RestHelper  = require('./helper/RestHelper.js');

const Trueyou    = require('./model/Trueyou');
const FiveStar   = require('./model/FiveStar');
const FiveStarMM = require('./model/FiveStarMM');


var schemaString = ''

var TY  = new Trueyou()
var KY  = new FiveStar()
var MM  = new FiveStarMM()

schemaString = schemaString + TY.getSchema()
schemaString = schemaString + KY.getSchema()
schemaString = schemaString + MM.getSchema()

schemaString = schemaString + `  
  type Query {
     trueyou : TrueyouQuery
     fivestar(api_key: String) : FiveStarQuery
     fivestar_myanmar : FiveStarMMQuery
  }

  type Mutation{
     trueyou : TrueyouMutate
     fivestar(api_key: String) : FiveStarMutate
     fivestar_myanmar : FiveStarMMMutate
  }
`;

// Construct a schema, using GraphQL schema language
var schema = buildSchema(schemaString);

// The root provides the top-level API endpoints
var root = {
  trueyou: function (args){
    global.args = args

    return new Trueyou();
  },
  fivestar : function(args){
    global.args = args

    return new FiveStar()
  },
  fivestar_myanmar : function(args){
    global.args = args

    return new FiveStarMM()
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