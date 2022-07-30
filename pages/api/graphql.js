import { ApolloServer } from 'apollo-server-micro'
import  {  typeDefs  }  from  "./server/typeDefs";
import  {  resolvers  }  from  "./server/resolvers";
import { makeExecutableSchema } from "@graphql-tools/schema";
import {connectDb} from '../../db/config/index'
import Cors from "micro-cors";

connectDb()

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})


export const config = {
    api: {
      bodyParser: false,
    },
  };
  
  const cors = Cors();
  
  const server = new ApolloServer({
    schema,
  });
  
  const startServer = server.start();
  
  export default cors(async (req, res) => {
    if (req.method === "OPTIONS") {
      res.end();
      return false;
    }
  
    await startServer;
    await server.createHandler({ path: "/api/graphql" })(req, res);
  });