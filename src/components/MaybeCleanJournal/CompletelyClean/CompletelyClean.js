import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
  useQuery
} from "@apollo/client";
import GetJournalCleanDataBalance from "./JournalData/GetJournalCleanDataBalance";

const client = new ApolloClient({
  uri: "https://currency.hasura.app/v1/graphql",
  cache: new InMemoryCache(),
  headers: {
    "x-hasura-admin-secret": process.env.REACT_APP_HASURA_GRAPHQL_ADMIN_SECRET
  }
});

export default function CompletelyClean() {
  return (
    <div>
      <ApolloProvider client={client}>
        <GetJournalCleanDataBalance />
      </ApolloProvider>
    </div>
  );
}
