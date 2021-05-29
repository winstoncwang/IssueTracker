const fs = require("fs");
const express = require("express");
const app = express();
const {GraphQLScalarType} = require('graphql')
const {Kind} = require('graphql/language')
//graphql

const {ApolloServer} = require('apollo-server-express');

//graphql custom scalar type

const GraphQLDate = new GraphQLScalarType({
    name:'GraphDLData',
    description:'A Date() type in GraphQL as a scalar',
    serialize(value){
        return value.toISOString();
    },
    parseValue(value){  //in pre-parsed JSON case, this is called.
        return new Date(value);
    },
    parseLiteral(ast){ //in normal cases, parseLiteral is called.
        return (ast.kind == Kind.STRING) ? new Date(ast.value) : undefined;
    }
})

//graphql defs

let aboutMessage = "Issue Tracker API v1.0"

const issuesDB = [
    {
      id: 1, status: 'New', owner: 'Ravan', effort: 5, created: new Date('2018-08-15'), due: undefined, title: 'Error in console when clicking Add'
    },
    {
      id: 2, status: 'Assigned', owner: 'Eddie', effort: 14, created: new Date('2018-08-16'), due: new Date('2018-08-30'), title: 'Missing botton border on panel'
    }
  ]

const resolvers = {
    Query: {
        about: () => aboutMessage,
        issueList
    },
    Mutation: {
        setAboutMessage,
        issueAdd,
    },
    GraphQLDate
};

function issueAdd (_,{ issue }){
    console.log(issue)
    issue.created = new Date();
    issue.id = issuesDB.length + 1;
    if(issue.status == undefined){issue.status="New"};
    issuesDB.push(issue);
    return issue;
}

function issueList(){
    return issuesDB;
}

function setAboutMessage(_, { message }){
    return aboutMessage = message;
};

const server = new ApolloServer({
    typeDefs: fs.readFileSync('./server/schema.graphql','utf-8'),
    resolvers
});

server.applyMiddleware({app, path:'/graphql'})

app.use('/',express.static("public"));

app.listen(3000,function(){
    console.log("App started on port 3000")
})