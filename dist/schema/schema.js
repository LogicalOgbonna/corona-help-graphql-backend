"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_1 = require("../firebase");
const graphql_1 = require("graphql");
const createdAtType = new graphql_1.GraphQLObjectType({
    name: "CreatedAt",
    fields: () => ({
        seconds: { type: graphql_1.GraphQLInt },
        nanoseconds: { type: graphql_1.GraphQLInt },
    })
});
const searchResultType = new graphql_1.GraphQLObjectType({
    name: "SearchResult",
    fields: () => ({
        business_status: { type: graphql_1.GraphQLString },
        icon: { type: graphql_1.GraphQLString },
        id: { type: graphql_1.GraphQLString },
        name: { type: graphql_1.GraphQLString },
        vicinity: { type: graphql_1.GraphQLString },
        rating: { type: graphql_1.GraphQLString },
        opening_hours: {
            type: new graphql_1.GraphQLObjectType({
                name: "OpeningHours",
                fields: { open_now: { type: graphql_1.GraphQLBoolean } }
            })
        }
    })
});
const searchType = new graphql_1.GraphQLObjectType({
    name: "SearchType",
    fields: () => ({
        id: { type: graphql_1.GraphQLString },
        location: { type: graphql_1.GraphQLString },
        radius: { type: graphql_1.GraphQLString },
        searchBy: { type: graphql_1.GraphQLString },
        time: { type: createdAtType },
        data: { type: new graphql_1.GraphQLList(searchResultType) }
    })
});
const userType = new graphql_1.GraphQLObjectType({
    name: "Users",
    fields: () => ({
        id: { type: graphql_1.GraphQLString },
        displayName: { type: graphql_1.GraphQLString },
        email: { type: graphql_1.GraphQLString },
        createdAt: { type: createdAtType },
        search: { type: new graphql_1.GraphQLList(searchType) }
    })
});
const RootQuery = new graphql_1.GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        users: {
            type: new graphql_1.GraphQLList(userType),
            resolve(parentValue, args) {
                return firebase_1.getUsers();
            }
        },
        user: {
            type: userType,
            args: {
                id: { type: graphql_1.GraphQLString }
            },
            resolve(parentValue, args) {
                return firebase_1.getUser({ id: args.id });
            }
        }
    }
});
exports.default = new graphql_1.GraphQLSchema({
    query: RootQuery,
});
