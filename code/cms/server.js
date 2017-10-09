var env_project = process.env.NODE_PROJECT.split(',')
var express     = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');
var fetch       = require('isomorphic-fetch');
var RestHelper  = require('./helper/RestHelper.js');

const Trueyou    = require('./model/Trueyou');
const FiveStar   = require('./model/FiveStar');
const FiveStarMM = require('./model/FiveStarMM');
const Cms = require('./model/Cms');
var schemaString = ''



if(env_project.indexOf("trueyou") != -1){
  var TY  = new Trueyou()
  schemaString = schemaString + TY.getSchema()
}
if(env_project.indexOf("fivestar") != -1){
  var KY  = new FiveStar()
  schemaString = schemaString + KY.getSchema()
}
if(env_project.indexOf("fivestar_myanmar") != -1){
  var MM  = new FiveStarMM()
  schemaString = schemaString + MM.getSchema()
}
if(env_project.indexOf("cms") != -1){
  var CMS  = new Cms()
  schemaString = schemaString + CMS.getSchema()
}

// schemaString = schemaString + `  type Query {`;



trueyouQuery = '';trueyouMutation = '';fivestarQuery = '';fivestarMutation = '';
fivestar_myanmarQuery = '';fivestar_myanmarMutation = '';CmsQuery = '';CmsMutation = '';
if(env_project.indexOf("trueyou") != -1){
  trueyouQuery = 'trueyou : TrueyouQuery';
  trueyouMutation = 'trueyou : TrueyouMutate';
}
if(env_project.indexOf("fivestar") != -1){
  fivestarQuery = 'fivestar(api_key: String) : FiveStarQuery';
  fivestarMutation = 'fivestar(api_key: String) : FiveStarMutate';
}
if(env_project.indexOf("fivestar_myanmar") != -1){
  fivestar_myanmarQuery = 'fivestar_myanmar : FiveStarMMQuery';
  fivestar_myanmarMutation = 'fivestar_myanmar : FiveStarMMMutate';
}
if(env_project.indexOf("cms") != -1){
  CmsQuery = 'cms(language:String) : CmsQuery';
  CmsMutation = 'cms : CmsMutate';
}


schemaString = schemaString + `  
  type Query {
     `+trueyouQuery+`
     `+fivestarQuery+`
     `+fivestar_myanmarQuery+`
     `+CmsQuery+`
  }

  type Mutation{
     `+trueyouMutation+`
     `+fivestarMutation+`
     `+fivestar_myanmarMutation+`
     `+CmsMutation+`
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
  },
  cms : function(args){
    global.args = args

    return new Cms()
  }
}

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4001/graphql');





