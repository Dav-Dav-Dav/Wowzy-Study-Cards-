import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useMutation, gql } from "@apollo/client";

//This function saves the edited text in Hasura
//It recieves the text to save from props
export default function EditSave(props) {
  const idId = props.num;
  const situationSituation = props.my.Situation;
  const reframeReframe = props.my.Reframe;

  const [count, setCount] = useState(0);
  const [insertTodo, { loading, error }] = useMutation(EDIT_TEXT);

  useEffect(() => {
    insertTodo({
      variables: {
        id: idId,
        situation: situationSituation,
        reframe: reframeReframe
      }
    });
  }, ["oneTime"]);

  //Time delay of 1 second  before Redirect occurs
  //Why? Gives Hasura time to save the mutation
  useEffect(() => {
    setTimeout(() => {
      setCount(true);
    }, 1000);
  }, ["onetime"]);

  if (count === 0) {
    return <p>Loading</p>;
  } else {
    return <Redirect to={"/journal"} />;
  }
}

//GraphQL query that edits text
export const EDIT_TEXT = gql`
  mutation MyMutation($id: Int = "", $reframe: String, $situation: String) {
    update_rates_by_pk(
      pk_columns: { id: $id }
      _set: { reframe: $reframe, situation: $situation }
    ) {
      reframe
      situation
    }
  }
`;
