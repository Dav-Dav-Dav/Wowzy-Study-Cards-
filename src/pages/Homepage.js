import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { Link } from "react-router-dom";

const client = new ApolloClient({
  uri: "https://currency.hasura.app/v1/graphql",
  cache: new InMemoryCache(),
  headers: {
    "x-hasura-admin-secret": process.env.REACT_APP_HASURA_GRAPHQL_ADMIN_SECRET
  }
});

export default function Homepage() {
  return (
    <ApolloProvider client={client}>
      <div class="h-screen flex justify-center items-center bg-green-50">
        <div class="grid grid-rows-2 gap-20 w-2/3">
          <div class="flex justify-center items-center">
          <h1 class="text-9xl">Journal</h1>
          </div>
          <div class="grid grid-cols-2">
            <div class="bg-blue-50 flex justify-center items-center">
              <Link to={`/journal`}>
                <button class="text-5xl">Start</button>
              </Link>
            </div>
            <div class="bg-red-50 flex justify-center items-center">
              <Link to={`/add`}>
                <button class="text-5xl">Add</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </ApolloProvider>
  );
}
