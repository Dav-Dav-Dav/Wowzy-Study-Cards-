import React, { useState, useEffect } from "react";
import { useMutation, gql } from "@apollo/client";
import { useParams, Redirect } from "react-router-dom";

//This function recieves the deleteId
//Using that data it runs a mutation to delete
//the Journal that matches the Id
export default function RunDeleteMutation(props) {
  const [count, setCount] = useState(0);
  const [insertTodo, { loading, error }] = useMutation(INSERT_TODO);

  const { deleteId } = useParams();

  useEffect(() => {
    console.log("Journal deleted");
    insertTodo({
      variables: {
        id: parseInt(deleteId)
      }
    });
  }, ["oneTime"]);

  useEffect(() => {
    setTimeout(() => {
      setCount(true);
    }, 2000);
  }, ["onetime"]);

  if (count === 0) {
    return <p>Loading</p>;
  } else {
    return <Redirect to={"/maybecleanjournal"} />;
  }
}

//GraphQL query to delete specific Journal by "id"
export const INSERT_TODO = gql`
  mutation($id: Int = "") {
    delete_rates_by_pk(id: $id) {
      id
      situation
      reframe
    }
  }
`;
