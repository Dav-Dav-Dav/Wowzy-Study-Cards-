import React, { useEffect, useState } from "react";
import {
  useQuery,
  gql,
  ApolloClient,
  InMemoryCache,
  ApolloProvider
} from "@apollo/client";
import Ready from "../components/Journal/Main/Ready";
import ReadyYet from "../components/Journal/Main/ReadyYet";
import MaybeCleanJournal from "./MaybeCleanJournal";

const client = new ApolloClient({
  uri: "https://currency.hasura.app/v1/graphql",
  cache: new InMemoryCache(),
  headers: {
    "x-hasura-admin-secret": process.env.REACT_APP_HASURA_GRAPHQL_ADMIN_SECRET
  }
});

export default function Journal() {
    return (
      <ApolloProvider client={client}>
      <div>
        <JournalOne />
      </div>
      </ApolloProvider>
    )
}

function JournalOne() {

  useEffect(() => {
    refetch();
  }, ["onetime"]);

  const { loading, error, data, refetch } = useQuery(
    GETREFRAMETEXTBYINCOMPLETE
  );

  if (loading) return null;
  if (error) return `Error! ${error}`;


  const reframeById = Object.values(data)[0].map((x) => x.reframe)[0];
  const situationById = Object.values(data)[0].map((x) => x.situation)[0];
  const idById = Object.values(data)[0].map((x) => x.id)[0];
  const cleanedById = Object.values(data)[0].map((x) => x.cleaned)[0];
  
  if (Object.values(data).map((x) => x.length === 0)[0]) {
    return (
      <div>
        <p>Finished</p>
      </div>
      )
  } else {
  return (
    <div>
      <ReadyYet cleaned={cleanedById} />
      <Ready reframe={reframeById} situation={situationById} id={idById} />
    </div>
  )
  }
}

//Query by {"status": "incomplete"}, limit to 1
const GETREFRAMETEXTBYINCOMPLETE = gql`
query {
  rates(limit: 1, where: { status: { _eq: "incomplete" } }) {
    id
    reframe
    situation
    cleaned
  }
}
`;