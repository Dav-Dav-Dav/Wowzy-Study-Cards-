import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  useQuery,
  gql,
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useMutation
} from "@apollo/client";
import UpdateToComplete from "./UpdateToComplete";

const client = new ApolloClient({
  uri: "https://currency.hasura.app/v1/graphql",
  cache: new InMemoryCache(),
  headers: {
    "x-hasura-admin-secret": process.env.REACT_APP_HASURA_GRAPHQL_ADMIN_SECRET
  }
});

const SEARCH = gql`
  query($_eq: Int = "") {
    rates(where: { id: { _eq: $_eq } }) {
      cleaned
    }
  }
`;

export default function CleanedCount() {
  return (
    <ApolloProvider client={client}>
      <div>
        <Check />
      </div>
    </ApolloProvider>
  );
}

//Checking how many times this Journal has been cleaned
function Check() {
  const { changeId } = useParams();

  const idd = parseInt(changeId);

  const { loading, error, data } = useQuery(SEARCH, {
    variables: {
      _eq: idd
    }
  });

  if (loading) return null;
  if (error) return `Error! ${error}`;

  const countValue = Object.values(data)[0].map((x) => x.cleaned)[0];

  return (
    <div>
      <UpdateToComplete c={countValue} />
    </div>
  );
}
