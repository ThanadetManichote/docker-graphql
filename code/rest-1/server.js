//{ user(id : "a") {id, name}}

var express = require('express');
var graphqlHTTP = require('express-graphql');
var graphql = require('graphql');
var fetch = require('isomorphic-fetch')

const base_url = "https://prod.trueyou.digitalsolution.us/trueyou_v4/api.php";

const privilegeType = new graphql.GraphQLObjectType(getPrivilegeSchema())
const masterType    = new graphql.GraphQLObjectType(getMasterSchema())

function getMasterSchema(){ 
  return {
    name: 'Master',
    fields: {
      master_id: { 
        type: graphql.GraphQLString ,
        resolve (master) { return master.master_id }
      },
      privileges: { 
        type: new graphql.GraphQLList(privilegeType) ,
        resolve (master) { return master.privilegelist.map(getPrivilege); }
      },

      privilege_list: { 
        type: new graphql.GraphQLList(graphql.GraphQLString),
        resolve (master) { return master.privilegelist }
      }
    }
  }
}

function getPrivilegeSchema(){
  return {
    name: 'Privilege',
    fields: {
      privilege_id: { 
        type: graphql.GraphQLString ,
        resolve (privilege) { return privilege.privilege_id }
      },
      privilege_info_th: { 
        type: graphql.GraphQLString ,
        resolve (privilege) { return privilege.privilege_info_th }
      },
      privilege_info_en: { 
        type: graphql.GraphQLString ,
        resolve (privilege) { return privilege.privilege_info_en }
      },
      masterid: { 
        type: graphql.GraphQLString ,
        resolve (privilege) { return privilege.masterID }
      },

      // master: {  
      //   type: new graphql.GraphQLList( masterType ),
      //   resolve (data) { return getMaster(data.masterID); }
      // },
    }
  }
}

var queryType = new graphql.GraphQLObjectType({
  name: 'Query',
  fields: {
    master: {
      type: masterType,
      args: {
        thaiid: { type: graphql.GraphQLString },
        masterid: { type: graphql.GraphQLString }
      },
      resolve: (root, args) =>  getMaster(args.masterid)
    },
    privilege: {
      type: privilegeType,
      args: {
        thaiid: { type: graphql.GraphQLString },
        privilegeid: { type: graphql.GraphQLString }
      },
      resolve: (root, args) =>  getPrivilege(args.privilegeid)
    }
  }
});

function getMaster(masterid){
  return fetch(`${base_url}?param={"command":"getmasterof","data":{"type":"0","id":"${masterid}"}}`)
        .then(res => res.json())
        .then(json => json.data.master)
}
function getPrivilege(privilegeid){
  return fetch(`${base_url}?param={"command":"getmasterof","data":{"type":"2","id":"${privilegeid}"}}`)
        .then(res => res.json())
        .then(json => json.data.master.privilege[privilegeid])
}

var schema = new graphql.GraphQLSchema({query: queryType});

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');