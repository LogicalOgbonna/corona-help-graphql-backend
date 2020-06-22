import express, { Application } from "express";
import expressGraphQL from "express-graphql";
import schema from "./schema/schema";
import dotEnv from 'dotenv';

const app: Application = express();

dotEnv.config()
app.use("/graphql", expressGraphQL({
    schema: schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log('Server is running on port 4000..');
});