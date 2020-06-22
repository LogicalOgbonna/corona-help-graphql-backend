import { getUser, getUsers } from "../firebase";
import {
    GraphQLBoolean,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
} from "graphql";

const createdAtType = new GraphQLObjectType({
    name: "CreatedAt",
    fields: () => ({
        seconds: { type: GraphQLInt },
        nanoseconds: { type: GraphQLInt },
    })
})

const searchResultType = new GraphQLObjectType({
    name: "SearchResult",
    fields: () => ({
        business_status: { type: GraphQLString },
        icon: { type: GraphQLString },
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        vicinity: { type: GraphQLString },
        rating: { type: GraphQLInt },
        opening_hours: {
            type: new GraphQLObjectType({
                name: "OpeningHours",
                fields: { open_now: { type: GraphQLBoolean } }
            })
        }
    })
})

const searchType = new GraphQLObjectType({
    name: "SearchType",
    fields: () => ({
        id: { type: GraphQLString },
        location: { type: GraphQLString },
        radius: { type: GraphQLString },
        searchBy: { type: GraphQLString },
        time: { type: createdAtType },
        data: { type: new GraphQLList(searchResultType) }
    })
})
const userType = new GraphQLObjectType({
    name: "Users",
    fields: () => ({
        id: { type: GraphQLString },
        displayName: { type: GraphQLString },
        email: { type: GraphQLString },
        createdAt: { type: createdAtType },
        search: { type: new GraphQLList(searchType) }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        users: {
            type: new GraphQLList(userType),
            resolve(parentValue: any, args: any) {
                return getUsers();
            }
        },
        user: {
            type: userType,
            args: {
                id: { type: GraphQLString }
            },
            resolve(parentValue: any, args: any) {
                return getUser({ id: args.id })
            }
        }
    }
})

export default new GraphQLSchema({
    query: RootQuery,
});