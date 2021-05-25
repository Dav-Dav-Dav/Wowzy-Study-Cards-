import React, { useEffect, useState } from "react";
import { useParams, Redirect } from "react-router-dom";
import {
  useQuery,
  gql,
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useMutation
} from "@apollo/client";

const client = new ApolloClient({
  uri: "https://currency.hasura.app/v1/graphql",
  cache: new InMemoryCache(),
  headers: {
    "x-hasura-admin-secret": process.env.REACT_APP_HASURA_GRAPHQL_ADMIN_SECRET
  }
});

const UPDATEIDTOCOMPLETE = gql`
  mutation($id: Int = "", $cleaned: Int = "") {
    update_rates_by_pk(
      pk_columns: { id: $id }
      _set: { status: "cleaned", cleaned: $cleaned }
    ) {
      id
    }
  }
`;

export default function UpdateToComplete(props) {
  const { changeId } = useParams();

  const id = parseInt(changeId);
  return (
    <ApolloProvider client={client}>
      <Run i={id} c={props.c} />
    </ApolloProvider>
  );
}

function Run(props) {
  const [count, setCount] = useState(0);
  const [insertTodo, { loading, error }] = useMutation(UPDATEIDTOCOMPLETE);

  //This triggers a mutation
  useEffect(() => {
    insertTodo({
      variables: {
        id: props.i,
        cleaned: props.c + 1
      }
    });
  }, [props.i]);

  //This delays the redirect by 1s
  //So that the Hasura mutation can occur
  //on the server successfully
  useEffect(() => {
    setTimeout(() => {
      setCount(true);
    }, 2000);
  }, ["onetime"]);

  if (count === 0) {
    return <p>Loading</p>;
  } else {
    return <Redirect to={"/journal"} />;
  }
}
