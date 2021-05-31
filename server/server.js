const fs = require("fs");
const express = require("express");
const app = express();
const {GraphQLScalarType} = require('graphql')
const {Kind} = require('graphql/language')
//graphql

const {ApolloServer, UserInputError} = require('apollo-server-express');

//graphql custom scalar type

const GraphQLDate = new GraphQLScalarType({
    name:'GraphDLData',
    description:'A Date() type in GraphQL as a scalar',
    serialize(value){
        return value.toISOString();
    },
    parseValue(value){  //in pre-parsed JSON case, this is called when query variables are used.
        const dateValue = new Date(value);
        return isNaN(dateValue) ? undefined:dateValue;

    },
    parseLiteral(ast){ //when literal query strings are used, parseLiteral is called.
        if(ast.kind == Kind.STRING){
            const value = new Date(ast.value);
            return isNaN(value) ? undefined :value;
        }
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
    issueValidate(issue);
    console.log('Added issue: '+ JSON.stringify(issue))
    issue.created = new Date();
    issue.id = issuesDB.length + 1;
    issuesDB.push(issue);
    return issue;
}

function issueList(){
    return issuesDB;
}

function setAboutMessage(_, { message }){
    return aboutMessage = message;
};

//validation
function issueValidate(issue){
    const errors = [];
    if(issue.title.length<3){
        errors.push('Field "title" must be at least 3 characters long.');
        
    }
    if(issue.status == 'Assigned' && !issue.owner){
        errors.push('Field "owner" is required when status is "Assigned"');
    }
    if(errors.length>0){
        throw new UserInputError('Invalid inputs(s)',{errors})
    }
}

const server = new ApolloServer({
    typeDefs: fs.readFileSync('./server/schema.graphql','utf-8'),
    resolvers,
    formatError: error=> {
        console.log(error);
        return error;
    }
});

server.applyMiddleware({app, path:'/graphql'})

app.use('/',express.static("public"));

app.listen(3000,function(){
    console.log("App started on port 3000")
})