import React, { useEffect, useState } from "react";
import {
  useQuery,
  gql,
  ApolloClient,
  InMemoryCache,
  ApolloProvider
} from "@apollo/client";
import RunReset from "../components/Journal/Reset/RunReset";
import ReadyMaybeClean from "../components/MaybeCleanJournal/Main/ReadyMaybeClean";
import ReadyYetMaybeClean from "../components/MaybeCleanJournal/Main/ReadyYetMaybeClean";

const client = new ApolloClient({
  uri: "https://currency.hasura.app/v1/graphql",
  cache: new InMemoryCache(),
  headers: {
    "x-hasura-admin-secret": process.env.REACT_APP_HASURA_GRAPHQL_ADMIN_SECRET
  }
});

export default function MaybeCleanJournal() {
  return (
    <ApolloProvider client={client}>
      <div>
        <Journal />
      </div>
    </ApolloProvider>
  );
}

function Journal() {
  //Hiding text with a black backround
  const [hidesituation, setHidesituation] = useState("black");
  const [hidereframe, setHidereframe] = useState("black");

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
    return <RunReset />;
  } else {
    return (
      <div>
        <ReadyYetMaybeClean />
        <ReadyMaybeClean reframe={reframeById} situation={situationById} id={idById} count={cleanedById} />
      </div>
    );
  }
}

const GETREFRAMETEXTBYINCOMPLETE = gql`
  query MyQuery {
    rates(where: { status: { _eq: "maybeClean" } }) {
      situation
      reframe
      id
      cleaned
    }
  }
`;
